import { useState } from "react";
import { rgbaToHsva, rgbToXY } from "@uiw/react-color";
import './App.css'
export default function ColorWheel() {
    // const [color, setColor] = useState('blue');
    // rgbToXY()
    const circleStyle = {
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        background: "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)",
        display: "inline-block",
    };

    return (
        <>
            <div>
                <svg width="500" height="500">
                    <circle cx="250" cy="250" r="100" stroke="black" strokeWidth="3" fill="lightblue" />
                    <text x="250" y="250" textAnchor="middle" alignmentBaseline="middle" fontSize="20" fill="black">
                        Text inside circle
                    </text>
                    {/* Add other components here as needed */}
                </svg>
            </div>


            <div>
                <svg width="500" height="500" viewBox="0 0 500 500">
                    <defs>
                        <mask id="mask-circle" x="0" y="0" width="100%" height="100%">
                            <circle cx="250" cy="250" r="200" fill="white" />
                            <circle cx="250" cy="250" r="150" fill="black" />
                        </mask>
                        <circle cx="250" cy="250" r="200" fill="url(#colorWheelGradient)" mask="url(#mask-circle)" />
                    </defs>

                    <defs>
                        <linearGradient id="colorWheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: 'red', stopOpacity: 1 }} />
                            <stop offset="16%" style={{ stopColor: 'yellow', stopOpacity: 1 }} />
                            <stop offset="33%" style={{ stopColor: 'green', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: 'cyan', stopOpacity: 1 }} />
                            <stop offset="66%" style={{ stopColor: 'blue', stopOpacity: 1 }} />
                            <stop offset="83%" style={{ stopColor: 'magenta', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: 'red', stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <circle cx="250" cy="250" r="200" fill="url(#colorWheelGradient)" />
                </svg>
            </div>

        </>

    );
}