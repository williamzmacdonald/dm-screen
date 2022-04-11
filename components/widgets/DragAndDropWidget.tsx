import RGL from "react-grid-layout";
import { DroppingItem } from "../../pages/dm-screen";
import { Notes } from "./Notes";
import { NPCGenerator } from "./NPCGenerator";

export const widgets = {
    notes: {
        component: <Notes />,
        layout: () => ({ i: "notes" + Math.random(), h: 2, w: 2 }),
    },
    npcGenerator: {
        component: <NPCGenerator />,
        layout: () => ({ i: "npcGenerator" + Math.random(), h: 2, w: 2 }),
    },
};

export const DragAndDropWidget = ({
    onDragStart,
    type,
}: {
    onDragStart: (droppingItem: DroppingItem) => void;
    type: "notes" | "npcGenerator";
}) => {
    return (
        <div
            className="p-5 bg-slate-200 m-10"
            draggable={true}
            unselectable="on"
            onDragStart={() => onDragStart(widgets[type].layout())}
        >
            {widgets[type].component}
        </div>
    );
};
