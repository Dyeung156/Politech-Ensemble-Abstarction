import React from "react";
import ClusterButton from "./ClusterButton";
import { strToArr } from "./util";
import opportunity_district_data from "./opportunity_district_data.json"

export default function ColorTriangle() {
  const data = Object.entries(opportunity_district_data);
  const max = data[data.length - 1][1];
  const clusterValues = data.slice(0, -1);

  const polylineConfigs = [
    { id: 1, points : "150,10 80,130 150,150 220,130", fill : "url(#redGradient)"},
    { id: 2, points : "10,250 80,130 150,150 150,250", fill : "url(#greenGradient)"},
    { id: 3, points : "290,250 220,130 150,150 150,250", fill : "url(#blueGradient)"}
  ];

  function createCoodrinates(mapTuple)
  {
    // the small decimal add is to prevent dividing by 0 error 
    let xValue = 150 + 140 * (mapTuple[2] / (max[2] + 0.00000001)) - 140 * (mapTuple[1] / (max[1] + 0.00000001));
    let yValue = 150 + 100 * (mapTuple[2] / (max[2] + 0.00000001)) - 140 * (mapTuple[0] / (max[0] + 0.00000001));

    return {x: xValue, y : yValue};
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
      {
        polylineConfigs.map((config) => (
          <polyline key = {config.id} points = {config.points} fill = {config.fill}/>
        ))
      }

      {
        clusterValues.map((cluster, index) => (
          <ClusterButton key = {index} 
          point = {createCoodrinates(strToArr(cluster[0]))} 
          mapData={cluster} 
          class = "tooltip"/>
        ))
      }
      
    </svg>
  );
}
