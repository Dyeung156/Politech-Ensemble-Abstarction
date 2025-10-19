import { useState, useRef, useEffect } from "react";
import {useDispatch } from "react-redux"
// import { RootState } from "@/redux/index";
import {cluster, addCluster, wipeCluster, lockOn} from "@/redux/clusterSlice"
import * as d3 from "d3";

interface ClusterButtonProps {
  point: {
    x: number
    y: number
  }
  mapData: [string, number[]]
  className?: string
  color?: string
  clusterType: string
}

/** 
 * Generate buttons based on RGB points
 */
export default function ClusterButton({ point, mapData, className, color, clusterType }: ClusterButtonProps) {
  const [showTuple, setShowTuple] = useState(false);
  const { x, y } = point;

  const dispatch = useDispatch();
  
  const [mapTuple, mapIndices] = mapData;
  const newCluster: cluster = 
  {
    anchorType: clusterType,
    anchorValue: mapTuple,
    mapIndices: mapIndices
  };
  const addClusterView = () => dispatch(addCluster(newCluster));
  const removeClusterView = () => dispatch(wipeCluster());
  const buttonClick = () => dispatch(lockOn());
      

  const myRef = useRef<SVGGElement>(null);
  useEffect(() => 
  {
    const group = d3.select(myRef.current);
    group.selectAll("*").remove(); // Clear previous elements
    // circle element
    group.append("circle")
        .attr("cx", x)
        .attr("cy", 300 - y)
        .attr("r", 5)
        .attr("fill", color ? color : "rgb(100,100,100)")
        .attr("stroke", "#000")
        .attr("stroke-width", "1.5")
        .style("cursor", "pointer")
        .on("click", buttonClick)
        .on("mouseenter", () => {setShowTuple(true); addClusterView();})
        .on("mouseleave", () => {setShowTuple(false); removeClusterView();});
    // show cluster value text only if showTuple is true
    if (showTuple) 
    {
      group.append("text")
        .attr("x", x + 10)
        .attr("y", 300 - y - 10)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("fill", "#000")
        .attr("font-size", "10")
        .attr("font-weight", "bold")
        .attr("pointer-events", "none")
        .text(mapData[0]);
    }

  },[x, y, color, mapData, clusterType, showTuple, dispatch]);

  return (
    <g ref = {myRef} className={className}>
      {/* Button circle */}
      {/* <circle
        cx={x}
        cy={300 - y}
        r={5}
        fill={color ? color: "rgb(100,100,100)"}
        stroke="#000"
        strokeWidth="1.5"
        style={{
          cursor: 'pointer',
          // filter: selectedButton === id ? 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' : 'none'
        }}
        onClick={buttonClick}

        onMouseEnter={() => setShowTuple(true)}
        onMouseLeave={() => setShowTuple(false)}
      /> */}

      {/* Label text */}
      {/* {showTuple && <text
        x={x + 10}
        y={300 - y - 10}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#000"
        fontSize="10"
        fontWeight="bold"
        pointerEvents="none"
      >
        {mapData[0]}
      </text>} */}
    </g>
  );
}
