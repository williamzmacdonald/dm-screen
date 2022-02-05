import { useState } from "react";
import RGL, { WidthProvider, Responsive } from "react-grid-layout";
import { DragAndDropWidget } from "../../components/widgets/DragAndDropWidget";
import { Sidebar } from "../../components/Sidebar";
import { Typography } from "../../components/Typography";
import { DMWidget } from "../../components/widgets/DMWidget";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
export interface DroppingItem {
    i: string;
    w: number;
    h: number;
}

const startingLayout: RGL.Layouts = {
    lg: [{ i: "a", x: 0, y: 0, w: 1, h: 2 }],
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
            <DragAndDropWidget onDragStart={setDroppingItem} type="notes" />
            <DragAndDropWidget
                onDragStart={setDroppingItem}
                type="npcGenerator"
            />
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
                    <div key={layout.i}>
                        <DMWidget type="notes" />
                    </div>
                ))}
            </ResponsiveReactGridLayout>
        </div>
    );
};

export default DMScreen;
