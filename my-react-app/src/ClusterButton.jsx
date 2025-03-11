import React from "react";

// Generate buttons based on RGB points
export default function ClusterButton({ point, mapData }) {
  const { x, y } = point;

  function buttonClick()
  {
    console.log(mapData);
  }

  return (
    <g >
      {/* Button circle */}
      <circle
        cx={x}
        cy={y}
        r={5}
        fill = "rgb(100,100,100)"
        stroke="#fff"
        strokeWidth="1.5"
        style={{
          cursor: 'pointer',
          // filter: selectedButton === id ? 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' : 'none'
        }}
      onClick={buttonClick}
      />

      {/* Label text */}
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fill = "#000"
        fontSize="10"
        fontWeight="bold"
        pointerEvents="none"
      >
        {/* {label} */}
      </text>
    </g>
  );
}
