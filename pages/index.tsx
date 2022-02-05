import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
    return (
        <Link href="/dm-screen">
            <a className="text-slate-50">Enter the dungeon</a>
        </Link>
    );
};

export default Home;
