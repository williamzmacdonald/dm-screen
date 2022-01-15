import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
    return (
        <Link href="/dm-screen">
            <a>Enter the dungeon</a>
        </Link>
    );
};

export default Home;
