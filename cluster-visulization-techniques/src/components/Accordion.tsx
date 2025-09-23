import { useState, ReactNode } from 'react';

export interface AccordionProps {
    title: string;
    children: ReactNode;
    onDelete: () => void;
}

export default function Accordion({ title, children, onDelete }: AccordionProps) {
    

    

    return (
        <div className="border rounded-md p-4">
            <div className="flex items-center gap-2">
                <p className="ml-2 flex-1 font-bold">{title}</p>
                
                {/* the + button */}
                <button
                    className="flex items-center text-blue-500 focus:outline-none"
                >
                    <svg
                        className="fill-indigo-500 shrink-0 ml-8"
                        width="16"
                        height="16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            y="7"
                            width="16"
                            height="2"
                            rx="1"
                            className={`transform origin-center transition duration-200 ease-out "!rotate-180"
                                `}
                        />
                        <rect
                            y="7"
                            width="16"
                            height="2"
                            rx="1"
                            className={`transform origin-center rotate-90 transition duration-200 ease-out  "!rotate-180"
                                `}
                        />
                    </svg>
                </button>
                {/* the x button */}
                <button
                    onClick={onDelete}
                    className="ml-4 text-red-500 hover:text-red-700 focus:outline-none"
                >
                    X
                </button>
            </div>
            <div className="mt-4">{children}</div>
        </div>
    );
}