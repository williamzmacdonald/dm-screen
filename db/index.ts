import { PrismaClient } from "@prisma/client";

import { tmpdir } from "os";
import fs from "fs";
import crypto from "crypto";

import clientIdentity from "../client-identity.enc";

declare global {
    var prisma: PrismaClient | undefined;
}

// nextjs dev server reloads files on page navigation, so new Prisma Clients were being spawned everytime
let prisma: PrismaClient;

if (!global.prisma) {
    if (process.env.NODE_ENV !== "development") {
        fs.writeFile(
            `${tmpdir()}/server-ca.pem`,
            process.env.CLIENT_CERTIFICATE!,
            (err) => {
                if (err) return console.log(err);
            }
        );

        const algorithm = "aes-128-cbc";
        const decipher = crypto.createDecipheriv(
            algorithm,
            process.env.CLIENT_IDENTITY_KEY!,
            process.env.CLIENT_IDENTITY_IV!
        );

        const getDecryptedSecret = () => {
            let decrypted = decipher.update(
                clientIdentity.encrypted,
                "base64",
                "utf8"
            );
            decrypted += decipher.final("utf8");
            return decrypted;
        };

        fs.writeFile(
            `${tmpdir()}/client-identity.p12`,
            getDecryptedSecret(),
            "base64",
            (err) => {
                if (err) return console.log(err);
            }
        );
    }
    global.prisma = new PrismaClient({});
}

prisma = global.prisma;

export default prisma;
