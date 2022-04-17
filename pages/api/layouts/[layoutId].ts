import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../db";

const layouts = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "DELETE") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { layoutId } = req.query;

    const layout = await prisma.layout.delete({
        where: {
            id: layoutId as string,
        },
    });

    res.json(layout);
};

export default layouts;
