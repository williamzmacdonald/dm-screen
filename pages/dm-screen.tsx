import GridLayout from "react-grid-layout";

const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
];

const DMScreen = () => {
    return (
        <GridLayout
            layout={layout}
            cols={6}
            rowHeight={30}
            width={1200}
            isResizable
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
