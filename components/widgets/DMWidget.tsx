import { widgets } from "./DragAndDropWidget";

export const DMWidget = ({ type }: { type: "notes" | "npcGenerator" }) => {
    return (
        <div className="w-full h-full bg-slate-200">
            {widgets[type].component}
        </div>
    );
};
