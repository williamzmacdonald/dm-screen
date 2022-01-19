import { ReactNode } from "react";

export const DMWidget = ({
    children,
    onDragStart,
}: {
    children: ReactNode;
    onDragStart: () => void;
}) => {
    return (
        <div
            className="p-10 bg-slate-200 m-10"
            draggable={true}
            unselectable="on"
            onDragStart={onDragStart}
        >
            {children}
        </div>
    );
};
