import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../db/index";

export default NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    debug: true,
    // debug: process.env.NODE_ENV === "development",
    secret: process.env.AUTH_SECRET,
    adapter: PrismaAdapter(prisma),
});
