import { Layout, PrismaClient } from "@prisma/client";
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

const DMScreen = ({ initialLayouts }: { initialLayouts: RGL.Layout[] }) => {
    const startingLayout: RGL.Layouts = {
        lg: initialLayouts,
    };

    console.log(initialLayouts);

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

const prisma = new PrismaClient();

export async function getServerSideProps() {
    const initialLayouts: RGL.Layout[] = (await prisma.layout.findMany()).map(
        (layout) => ({
            i: `${layout.type}:${layout.id}`,
            h: layout.height,
            w: layout.width,
            x: layout.x,
            y: layout.y,
        })
    );

    return {
        props: {
            initialLayouts: initialLayouts,
        },
    };
}
