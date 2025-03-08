// import React from "react";

// const ColorTriangle = () => {
//   return (
//     <svg width="200" height="200" viewBox="0 0 200 200">
//       {/* Define a gradient */}
//       <defs>
//         <linearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//           <stop offset="0%" stopColor="red" />
//           <stop offset="50%" stopColor="blue" />
//           <stop offset="100%" stopColor="green" />
//         </linearGradient>
//       </defs>

//       {/* Triangle shape with gradient fill */}
//       <polygon points="100,10 10,190 190,190" fill="url(#triangleGradient)" stroke="black" strokeWidth="2" />
//     </svg>
//   );
// };

// export default ColorTriangle;

export default function MaxwellColorTriangle() {
    return (
      <svg width="300" height="260" viewBox="0 0 300 260">
        {/* Define the color gradients */}
        <defs>
          <linearGradient id="redGradient" x1 = "0%" y1 = "0%" x2 = "0%" y2 = "100%">
            <stop offset="0%" stopColor="red" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
          <linearGradient id="greenGradient" x1 = "0%" y1 = "0%" x2 = "100%" y2 = "0%">
            <stop offset="0%" stopColor="lime" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
          <linearGradient id="blueGradient" x1 = "100%" y1 = "100%" x2 = "0%" y2 = "0%">
            <stop offset="0%" stopColor="blue" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
        </defs>
  
        {/* Draw the triangle */}
        <polygon
          points="150,10 10,250 290,250"
          fill="black"
          stroke="white"
          strokeWidth="2"
        />
        
        {/* Apply color gradients */}
        <polyline points = "150,10 80,130 150,150 220,130" fill="url(#redGradient)" />
        <polyline points = "10,250 80,130, 150,150 150,250" fill="url(#greenGradient)" />
        <polyline points = "290,250 220,130, 150,150 150,250" fill="url(#blueGradient)" />
      </svg>
    );
  }
  