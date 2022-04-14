import { useState } from "react";
import RGL, { WidthProvider, Responsive } from "react-grid-layout";
import {
    DMWidget,
    isWidget,
    widgets,
    WidgetSideBar,
} from "../../components/widgets";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export interface DroppingItem {
    i: string;
    w: number;
    h: number;
}

const startingLayout: RGL.Layouts = {
    lg: [{ ...widgets.notes.droppingItem(), x: 0, y: 0 }],
};

const DMScreen = () => {
    const [layouts, setLayouts] = useState(startingLayout);
    const [droppingItem, setDroppingItem] = useState<DroppingItem>();
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
            setDroppingItem(undefined);
        }
    };

    return (
        <div className="flex h-full">
            <WidgetSideBar onDragStart={setDroppingItem} />
            <ResponsiveReactGridLayout
                className="h-full w-full"
                layouts={layouts}
                // onLayoutChange={onLayoutChange}
                onDrop={onDrop}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={30}
                isDroppable
                autoSize
                droppingItem={droppingItem}
            >
                {layouts.lg.map((layout) => {
                    const type = layout.i.split(":")[0];

                    if (!isWidget(type)) {
                        return null;
                    }

                    return (
                        <div key={layout.i}>
                            <DMWidget type={type} />
                        </div>
                    );
                })}
            </ResponsiveReactGridLayout>
        </div>
    );
};

export default DMScreen;
