import React from "react";
import { strToArr } from "./util";

export default function ColorTriangle({ map, max }) {
  const polylineConfigs = [
    { id: 1, points : segmentPoints("Hispanic", map, max), fill : "url(#redGradient)"},
    { id: 2, points : segmentPoints("Black", map, max), fill : "url(#greenGradient)"},
    { id: 3, points : segmentPoints("White", map, max), fill : "url(#blueGradient)"}
  ];

  function segmentPoints(segment, map, max){
    const mapTuple = strToArr(map[0]);
    const sizeFactor = Math.max(...max);

    let xValue = 0;
    let yValue = 0;
    let otherPoints = "";
    switch (segment)
    {
      case "Hispanic":
        xValue = 150;
        yValue = 150 - 140 * (mapTuple[0] / sizeFactor);
        otherPoints = "80,130 150,150 220,130";
        break;
      case "Black":
        xValue = 150 - 140 * (mapTuple[1] / sizeFactor);
        yValue = 150 + 100 * (mapTuple[1] / sizeFactor);
        otherPoints = "80,130 150,150 150,250";
        break;
      case "White":
        xValue = 150 + 140 * (mapTuple[2] / sizeFactor);
        yValue = 150 + 100 * (mapTuple[2] / sizeFactor);
        otherPoints = "220,130 150,150 150,250"; 
        break;
    }

    return `${xValue},${yValue} ${otherPoints}`;
    
  }

  return (
    <svg width="300" height="300" viewBox="0 0 300 300">
      {/* Define the color gradients */}
      <defs>
        <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="red" />
          {/* <stop offset="100%" stopColor="white" /> */}
        </linearGradient>
        <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="lime" />
          {/* <stop offset="100%" stopColor="white" /> */}
        </linearGradient>
        <linearGradient id="blueGradient" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="blue" />
          {/* <stop offset="100%" stopColor="white" /> */}
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
      {/* <polyline points = {segmentPoints("Hispanic", map, max)} fill="url(#redGradient)" />
      <polyline points = {segmentPoints("Black", map, max)} fill="url(#greenGradient)" />
      <polyline points = {segmentPoints("White", map, max)} fill="url(#blueGradient)" /> */}
      {
        polylineConfigs.map((config) => (
          <polyline key = {config.id} points = {config.points} fill = {config.fill}/>
        ))
      }
    </svg>
  );
}
