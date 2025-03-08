import React, { useState } from 'react';

function ColorWheelWithRGBButtons() {
  // Configuration
  const size = 300;
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.4;
  
  // State to track selected button
  const [selectedButton, setSelectedButton] = useState(null);

  // Generate color segments for the wheel background
  const generateColorSegments = () => {
    const segmentElements = [];
    const segments = 24;
    
    // Loop thru each segment based on degrees 
    for (let i = 0; i < 360; i += 360 / segments) {
      // detail the color for the segment
      const hue = i;
      const color = `hsl(${hue}, 100%, 50%)`;
      
      // convert degrees to radians for math function
      const startAngle = (i * Math.PI) / 180;
      const endAngle = ((i + 360 / segments) * Math.PI) / 180;
      
      // get the segment's first point on the circumference 
      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);

      // get the segment's second point on the curcumference 
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);
      
      // make a SVG path string that:
        //moves to center of the circle 
        //draws a line from center to first point
        //draws an arc from first point to second point
        //close the segment with a line back to center 
      const path = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
      
      // make a SVG path element and add it to the array
      segmentElements.push(
        <path 
          key={i} 
          d={path} 
          fill={color} 
          stroke="#fff"
          strokeWidth="0.5"
        />
      );
    }
    
    return segmentElements;
  };

  // Define specific RGB color points
  const rgbColorPoints = [
    { id: "red", rgb: [50, 100, 150], label: "R" },
    { id: "green", rgb: [0, 255, 0], label: "G" },
    { id: "blue", rgb: [0, 0, 255], label: "B" },
    { id: "yellow", rgb: [255, 255, 0], label: "Y" },
    { id: "cyan", rgb: [0, 255, 255], label: "C" },
    { id: "magenta", rgb: [255, 0, 255], label: "M" },
    { id: "white", rgb: [255, 255, 255], label: "W" },
    { id: "black", rgb: [0, 0, 0], label: "K" }
  ];

  // Calculate XY position from RGB values
  const rgbToXY = (r, g, b) => {
    // Convert RGB to HSL to get angle and saturation
    const max = Math.max(r, g, b) / 255;
    const min = Math.min(r, g, b) / 255;
    const delta = max - min;
    
    let h = 0;
    if (delta > 0) {
      if (max === r / 255) {
        h = ((g / 255 - b / 255) / delta) % 6;
      } else if (max === g / 255) {
        h = (b / 255 - r / 255) / delta + 2;
      } else {
        h = (r / 255 - g / 255) / delta + 4;
      }
      h = h * 60;
      if (h < 0) h += 360;
    }
    
    const l = (max + min) / 2;
    const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
    // Convert HSL to position
    // Special cases for black and white
    if ((r === 0 && g === 0 && b === 0) || (r === 255 && g === 255 && b === 255)) {
      // Place black at center, white at a small distance from center
      const distanceFromCenter = (r === 0 && g === 0 && b === 0) ? 0 : 0.15 * radius;
      return {
        x: centerX + distanceFromCenter * Math.cos(0),
        y: centerY + distanceFromCenter * Math.sin(0),
      };
    }
    
    // For other colors, use hue and saturation
    const angle = h * Math.PI / 180;
    const distance = s * radius;
    
    return {
      x: centerX + distance * Math.cos(angle),
      y: centerY + distance * Math.sin(angle),
    };
  };

  // Generate buttons based on RGB points
  const generateRGBButtons = () => {
    return rgbColorPoints.map(point => {
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
    });
  };

  // Handle button click
  const handleButtonClick = (id, r, g, b) => {
    setSelectedButton(id);
    console.log(`Selected: ${id}, RGB(${r}, ${g}, ${b})`);
    // Add your custom logic here
  };

  return (
    <div className="color-wheel-container">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Color wheel background */}
        {generateColorSegments()}
        
        {/* RGB buttons */}
        {generateRGBButtons()}
        
        {/* Selected color display */}
        {selectedButton && (
          <text
            x={centerX}
            y={size - 20}
            textAnchor="middle"
            fill="black"
            fontSize="14"
          >
            Selected: {selectedButton}
          </text>
        )}
      </svg>
    </div>
  );
}

export default ColorWheelWithRGBButtons;