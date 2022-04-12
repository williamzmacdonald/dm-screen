import { Listbox } from "@headlessui/react";
import { ChangeEvent, useState } from "react";
import { Typography } from "../Typography";

const DICE = [4, 6, 8, 10, 12, 20, 100];

export const RollableTable = () => {
    const [selectedDice, setSelectedDice] = useState(10);
    const [table, setTable] = useState<string[]>([]);
    const [result, setResult] = useState<number>();
    const [title, setTitle] = useState("My Rollable Table");

    const roll = () => {
        setResult(Math.floor(Math.random() * selectedDice));
    };

    const changeOption = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const tableCopy = [...table];
        tableCopy[index] = e.target.value;
        setTable(tableCopy);
    };

    let options = [];
    for (let i = 0; i < selectedDice; i++) {
        options.push(
            <div key={i} className="flex">
                <Typography className="mr-1 w-1/6">{i + 1}</Typography>
                <input
                    value={table[i] ?? ""}
                    onChange={(e) => changeOption(e, i)}
                    onMouseDown={(e: React.MouseEvent<HTMLInputElement>) =>
                        e.stopPropagation()
                    }
                    className={
                        "shadow w-full box-border p-1 m-0.5 h-6 " +
                        (result === i ? "bg-red-300" : "bg-transparent")
                    }
                />
            </div>
        );
    }
    return (
        <div className="flex flex-col h-full p-1">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onMouseDown={(e: React.MouseEvent<HTMLInputElement>) =>
                    e.stopPropagation()
                }
                className="bg-transparent text-center"
            />
            <Listbox value={selectedDice} onChange={setSelectedDice}>
                <div className="flex gap-1 justify-center">
                    <Listbox.Button>d{selectedDice}</Listbox.Button>
                    <button onClick={roll}>ROLL</button>
                </div>
                {(result || result === 0) && (
                    <Typography>{table[result]}</Typography>
                )}
                <Listbox.Options className="flex flex-col absolute bg-white">
                    {DICE.map((dice) => (
                        <Listbox.Option key={dice} value={dice}>
                            {({ active }) => (
                                <Typography
                                    className={`${active && "bg-blue-500"}`}
                                >
                                    d{dice}
                                </Typography>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
            <div className="p-2 h-full overflow-y-auto">{options}</div>
        </div>
    );
};
