import { DroppingItem } from "../../pages/dm-screen";
import { Sidebar } from "../Sidebar";
import { Notes } from "./Notes";
import { RollableTable } from "./RollableTable";

export const widgets = {
    notes: {
        component: <Notes />,
        droppingItem: () => ({ i: "notes:" + Math.random(), h: 6, w: 2 }),
    },
    rollableTable: {
        component: <RollableTable />,
        droppingItem: () => ({
            i: "rollableTable:" + Math.random(),
            h: 6,
            w: 2,
        }),
    },
};

export type Widgets = keyof typeof widgets;

export const isWidget = (widget: string): widget is Widgets =>
    !!Object.keys(widgets).find((w) => w === widget);

export const DMWidget = ({ type }: { type: Widgets }) => {
    return (
        <div className="w-full h-full bg-slate-200">
            {widgets[type].component}
        </div>
    );
};

export const WidgetSideBar = ({
    onDragStart,
}: {
    onDragStart: (droppingItem: DroppingItem) => void;
}) => (
    <Sidebar>
        {Object.keys(widgets).map((widget) => (
            <div
                className="text-center w-full h-24 bg-slate-200 mb-10"
                draggable={true}
                unselectable="on"
                onDragStart={() =>
                    onDragStart(widgets[widget as Widgets].droppingItem())
                }
                key={widget}
            >
                {widget}
            </div>
        ))}
    </Sidebar>
);
