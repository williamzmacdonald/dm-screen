import { useState } from "react";
import RGL, { WidthProvider, Responsive } from "react-grid-layout";
import { DMWidget } from "../../components/DMWidget";
import { Sidebar } from "../../components/Sidebar";
import { Typography } from "../../components/Typography";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const startingLayout: RGL.Layouts = {
    lg: [
        { i: "a", x: 0, y: 0, w: 1, h: 2 },
        { i: "b", x: 1, y: 0, w: 3, h: 2 },
        { i: "c", x: 4, y: 0, w: 1, h: 2 },
    ],
};

const DMScreen = () => {
    const [layouts, setLayouts] = useState(startingLayout);
    const [droppingItem, setDroppingItem] = useState({ i: "", w: 2, h: 2 });

    // const onLayoutChange = (
    //     currentLayout: RGL.Layout[],
    //     allLayouts: RGL.Layouts
    // ) => {
    // };

    const onDrop = (layout: RGL.Layout[]) => {
        if (droppingItem) {
            setLayouts({
                ...layouts,
                lg: layout,
            });
        }
    };

    const widgets = (
        <>
            <DMWidget
                onDragStart={() =>
                    setDroppingItem({ i: "notes" + Math.random(), h: 2, w: 2 })
                }
            >
                <Typography className="text-slate-900">Notes</Typography>
            </DMWidget>
            <DMWidget
                onDragStart={() =>
                    setDroppingItem({
                        i: "npc-generator" + Math.random(),
                        h: 2,
                        w: 2,
                    })
                }
            >
                <Typography className="text-slate-900">
                    NPC Generator
                </Typography>
            </DMWidget>
        </>
    );

    return (
        <div className="flex h-full">
            <Sidebar>{widgets}</Sidebar>
            <ResponsiveReactGridLayout
                className="h-full w-5/6"
                layouts={layouts}
                // onLayoutChange={onLayoutChange}
                onDrop={onDrop}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={30}
                isDroppable
                autoSize
                droppingItem={droppingItem}
            >
                {layouts.lg.map((layout) => (
                    <div key={layout.i} className="bg-slate-200 rounded-sm">
                        {layout.i}
                    </div>
                ))}
            </ResponsiveReactGridLayout>
        </div>
    );
};

export default DMScreen;
