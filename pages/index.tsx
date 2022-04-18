import type { NextPage } from "next";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Typography } from "../components/Typography";

const Home: NextPage = () => {
    const { data: session } = useSession();

    if (session) {
        return (
            <>
                <Typography>Welcome {session.user?.name}!</Typography>
                <Link href="/dm-screen">
                    <a className="text-slate-50">Enter the dungeon</a>
                </Link>
                <button onClick={() => signOut()}>Sign out</button>
            </>
        );
    }
    return (
        <>
            <Typography>Not signed in</Typography>
            <button onClick={() => signIn()}>Sign in</button>
        </>
    );
};

export default Home;
