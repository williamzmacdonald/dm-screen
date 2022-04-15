import { Layout, PrismaClient } from "@prisma/client";
import { useState } from "react";
import RGL, { WidthProvider, Responsive } from "react-grid-layout";
import { DMWidget, isWidget, WidgetSideBar } from "../../components/widgets";
import { prisma } from "../../db";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export interface DroppingItem {
    i: string;
    w: number;
    h: number;
}

// function debounce(func, timeout = 300){
//     let timer;
//     return (...args) => {
//       clearTimeout(timer);
//       timer = setTimeout(() => { func.apply(this, args); }, timeout);
//     };
//   }
//   function saveInput(){
//     console.log('Saving data');
//   }
//   const processChange = debounce(() => saveInput());

async function saveLayout(layouts: RGL.Layout[]) {
    const massagedLayouts: Layout[] = layouts.map((layout) => ({
        id: layout.i.split(":")[1],
        type: layout.i.split(":")[0],
        height: layout.h,
        width: layout.w,
        x: layout.x,
        y: layout.y,
    }));
    const response = await fetch("/api/layouts", {
        method: "POST",
        body: JSON.stringify(massagedLayouts),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

async function deleteLayout(id: string) {
    const response = await fetch(`/api/layouts/${id.split(":")[1]}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return await response.json();
}

const DMScreen = ({ initialLayouts }: { initialLayouts: RGL.Layout[] }) => {
    const startingLayout: RGL.Layouts = {
        lg: initialLayouts,
    };

    const [layouts, setLayouts] = useState(startingLayout);
    const [droppingItem, setDroppingItem] = useState<DroppingItem>();
    const onLayoutChange = (
        currentLayout: RGL.Layout[],
        allLayouts: RGL.Layouts
    ) => {
        if (droppingItem) {
            return;
        }

        saveLayout(currentLayout);
    };

    const onDrop = async (layout: RGL.Layout[]) => {
        if (!droppingItem) {
            return;
        }
        const newLayout: Layout[] = await saveLayout(layout);
        const massagedLayouts: RGL.Layout[] = newLayout.map((l) => ({
            i: `${l.type}:${l.id}`,
            w: l.width,
            h: l.height,
            x: l.x,
            y: l.y,
        }));
        setLayouts({
            ...layouts,
            lg: massagedLayouts,
        });
        setDroppingItem(undefined);
    };

    const deleteHandler = async (i: string) => {
        const deletedLayout = await deleteLayout(i);

        setLayouts({
            lg: layouts.lg.filter(
                (layout) => layout.i.split(":")[1] !== deletedLayout.id
            ),
        });
    };

    return (
        <div className="flex h-full">
            <WidgetSideBar onDragStart={setDroppingItem} />
            <ResponsiveReactGridLayout
                className="h-full w-full"
                layouts={layouts}
                onLayoutChange={onLayoutChange}
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
                            <button
                                onClick={() => deleteHandler(layout.i)}
                                className="text-red-600 absolute top-1 right-1"
                            >
                                x
                            </button>

                            <DMWidget type={type} />
                        </div>
                    );
                })}
            </ResponsiveReactGridLayout>
        </div>
    );
};

export default DMScreen;

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
