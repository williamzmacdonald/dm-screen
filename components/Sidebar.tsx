import { ReactNode } from "react";

export const Sidebar = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-1/6 border-r-2 p-2 border-red-700 flex flex-col">
            {children}
        </div>
    );
};
