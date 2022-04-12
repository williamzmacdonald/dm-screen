import RGL from "react-grid-layout";
import { DroppingItem } from "../../pages/dm-screen";
import { Notes } from "./Notes";
import { RollableTable } from "./RollableTable";

export const widgets = {
    notes: {
        id: "notes" + Math.random(),
        component: <Notes />,
        droppingItem: () => ({ i: widgets.notes.id, h: 6, w: 2 }),
    },
    rollableTable: {
        id: "notes" + Math.random(),
        component: <RollableTable />,
        droppingItem: () => ({
            i: "rollableTable" + Math.random(),
            h: 6,
            w: 2,
        }),
    },
};

export const DragAndDropWidget = ({
    onDragStart,
    type,
}: {
    onDragStart: (droppingItem: DroppingItem) => void;
    type: "notes" | "rollableTable";
}) => {
    return (
        <div
            className="text-center w-full h-24 bg-slate-200 mb-10"
            draggable={true}
            unselectable="on"
            onDragStart={() => onDragStart(widgets[type].droppingItem())}
        >
            {type}
        </div>
    );
};
