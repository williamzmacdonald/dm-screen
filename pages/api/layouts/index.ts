import type { NextApiRequest, NextApiResponse } from "next";
import { Layout } from "@prisma/client";
import prisma from "../../../db";
import { getSession } from "next-auth/react";

const layouts = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });

    if (!session) {
        return res
            .status(403)
            .json({ message: "You must be signed in to access this page." });
    }
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const layoutData = JSON.parse(req.body) as Layout[];

    const savedLayouts = layoutData.map(async (layout) => {
        return prisma.layout.upsert({
            where: {
                id: layout.id,
            },
            update: {
                ...layout,
                id: undefined,
            },
            create: {
                ...layout,
                id: undefined,
            },
        });
    });

    res.json(await Promise.all(savedLayouts));
};

export default layouts;
