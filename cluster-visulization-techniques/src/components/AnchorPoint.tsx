import point from "@/util/pointType";
import * as d3 from "d3";
import { useRef, useEffect } from "react";

interface AnchorPointProps {
    point: {
      x: number
      y: number
    }
    mapData: [string, number[]]
    className: string
    clusterType: string
  }

function textPlacement(anchorPlace: point, circleCenter: point) {
  let resultX: number = 0 

  if (anchorPlace.x < circleCenter.x )
    resultX = anchorPlace.x - 15
  else 
    resultX = anchorPlace.x + 15

  return resultX;
}

export default function AnchorPoint({ point, mapData, className, clusterType }: AnchorPointProps) 
{
  const { x, y } = point;
  const textX: number = textPlacement(point, {x: 150, y: 150});

  const myRef = useRef<SVGGElement>(null);

  useEffect(() => 
  {
    const group = d3.select(myRef.current);

    // circle element 
    group.append("circle")
      .attr("cx", x)
      .attr("cy", 300 - y)
      .attr("r", 5)
      .attr("fill", "black")
      .attr("stroke", "#000")
      .attr("stroke-width", "1.5")
      .style("cursor", "pointer");
    
    // text element with offset
    const text = group.append("text")
      .attr("x", textX)
      .attr("y", 300 - y + 15)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("fill", "#333333")
      .attr("font-size", "10.5")
      .attr("font-weight", "bold")
      .attr("pointer-events", "none")

    // to show the cluster type 
    text.append("tspan")
      .attr("x", textX)
      .attr("dy", "0")
      .attr("text-anchor", "middle")
      .text(clusterType);

    // to show the anchor point value 
    text.append("tspan")
      .attr("x", textX)
      .attr("dy", "10")
      .attr("text-anchor", "middle")
      .text(mapData[0]); // mapData[0] is the cluster name or identifier
    
  }, [ x, y, textX, mapData, clusterType]);

  return (
    // <g className={className}>
    //   {/* Button circle */}
    //   <circle
    //     cx={x}
    //     cy={300 - y}
    //     r={5}
    //     fill={"black"}
    //     stroke="#000"
    //     strokeWidth="1.5"
    //     style={{
    //       cursor: 'pointer',
    //       // filter: selectedButton === id ? 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' : 'none'
    //     }}

    //   />

    //   {/* Label text */}
    //   <text
    //     x={textX}
    //     y={300 - y + 15}
    //     textAnchor="middle"
    //     dominantBaseline="central"
    //     fill = "#333333"
    //     fontSize="10.5"
    //     fontWeight="bold"
    //     pointerEvents="none"
    //   >
    //     <tspan x = {textX} dy="0" textAnchor="middle"> {clusterType} </tspan>
    //     <tspan x = {textX} dy = "10" textAnchor="middle"> {mapData[0]} </tspan>
    //   </text>


    // </g>
    <g ref={myRef} className={className}>
    </g>
  );

}