import type { NextApiRequest, NextApiResponse } from "next";
import { Layout } from "@prisma/client";
import { prisma } from "../../../db";

const layouts = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "DELETE") {
        const id = JSON.parse(req.body);
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
