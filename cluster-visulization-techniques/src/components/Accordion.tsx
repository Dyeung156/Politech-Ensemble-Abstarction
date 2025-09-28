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