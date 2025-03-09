import React from "react";

// Generate buttons based on RGB points
export default function ClusterButton({point}) {
      const { id, rgb, label } = point;
      const [r, g, b] = rgb;
      const { x, y } = rgbToXY(r, g, b);
      
      // Button color will be the RGB color for visual reference
      const buttonColor = `rgb(${r}, ${g}, ${b})`;
      const textColor = (r + g + b) / 3 > 128 ? "#000" : "#fff";
      
      return (
        <g key={id}>
          {/* Button circle */}
          <circle
            cx={x}
            cy={y}
            r={10}
            fill={buttonColor}
            stroke="#fff"
            strokeWidth="1.5"
            style={{ 
              cursor: 'pointer',
              filter: selectedButton === id ? 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' : 'none'
            }}
            onClick={() => handleButtonClick(id, r, g, b)}
          />
          
          {/* Label text */}
          <text
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fill={textColor}
            fontSize="10"
            fontWeight="bold"
            pointerEvents="none"
          >
            {label}
          </text>
        </g>
      );
  }

  // Handle button click
  const handleButtonClick = (id, r, g, b) => {
    setSelectedButton(id);
    console.log(`Selected: ${id}, RGB(${r}, ${g}, ${b})`);
    // Add your custom logic here
  };