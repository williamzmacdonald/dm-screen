import React, { useState } from "react";
import { Typography } from "../Typography";
import { Tab } from "@headlessui/react";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export const Notes = () => {
    const [notes, setNotes] = useState([
        { id: Math.random().toString(), body: "", title: "My Note" },
    ]);

    const addTab = () => {
        setNotes([
            ...notes,
            { id: Math.random().toString(), body: "", title: "My Note" },
        ]);
    };
    const changeNote = (
        value: string,
        id: string,
        property: "title" | "body"
    ) => {
        console.log("changing note", value, id);
        let editedNote = notes.find((note) => note.id === id);
        if (!editedNote) {
            return;
        }
        editedNote = { ...editedNote, [property]: value };
        setNotes(
            notes.map((note) =>
                note.id === id && editedNote ? editedNote : note
            )
        );
    };
    console.log(notes);
    return (
        <div className="h-full p-2">
            <Tab.Group>
                <Tab.List className="flex p-1 space-x-1 bg-red-900/20 rounded-xl h-1/4">
                    {notes.map((note) => (
                        <Tab
                            key={note.id}
                            as="input"
                            type="text"
                            className={({ selected }) =>
                                classNames(
                                    "w-full py-2.5 text-sm leading-5 font-medium text-red-700 rounded-lg text-center",
                                    "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-red-400 ring-white ring-opacity-60",
                                    selected
                                        ? "bg-white shadow"
                                        : "text-red-100 bg-transparent  hover:text-white"
                                )
                            }
                            value={note.title}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => changeNote(e.target.value, note.id, "title")}
                            onMouseDown={(
                                e: React.MouseEvent<HTMLInputElement>
                            ) => e.stopPropagation()}
                        >
                            {/* <input
                                
                                className=""
                            /> */}
                        </Tab>
                    ))}
                    <button onClick={addTab}>+</button>
                </Tab.List>
                <Tab.Panels className="mt-2 h-2/3">
                    {notes.map((note) => (
                        <Tab.Panel
                            key={note.id}
                            className={classNames(
                                "bg-white rounded-xl p-3 h-full",
                                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-red-400 ring-white ring-opacity-60"
                            )}
                        >
                            <textarea
                                value={note.body}
                                onChange={(e) =>
                                    changeNote(e.target.value, note.id, "body")
                                }
                                className="resize-none w-full h-full"
                                onMouseDown={(e) => e.stopPropagation()}
                            />
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};
