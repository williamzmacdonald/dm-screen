import { ReactNode } from "react";
import { Header } from "./Header";

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="h-screen flex flex-col bg-zinc-900 overflow-auto">
            <Header />
            {children}
        </div>
    );
};
