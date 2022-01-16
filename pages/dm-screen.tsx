import { useState } from "react";
import RGL, { WidthProvider, Responsive } from "react-grid-layout";

const GridLayout = WidthProvider(RGL);

const startingLayout: RGL.Layout[] = [
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 3, h: 2 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
];

const DMScreen = () => {
    const [layout, setLayout] = useState(startingLayout);

    const onLayoutChange = (layout: RGL.Layout[]) => {
        setLayout(layout);
    };

    return (
        <GridLayout
            className="h-full"
            layout={layout}
            onLayoutChange={onLayoutChange}
            cols={12}
            rowHeight={30}
            isBounded
        >
            <div key="a" className="bg-slate-200 rounded-sm">
                a
            </div>
            <div key="b" className="bg-slate-200 rounded-sm">
                b
            </div>
            <div key="c" className="bg-slate-200 rounded-sm">
                c
            </div>
        </GridLayout>
    );
};

export default DMScreen;
