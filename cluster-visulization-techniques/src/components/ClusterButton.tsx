import { useState } from "react";
import {useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/index";
import {addCluster} from "@/redux/clusterSlice"

interface ClusterButtonProps {
  point: {
    x: number
    y: number
  }
  mapData: [string, number[]]
  className?: string
}

/** 
 * Generate buttons based on RGB points
 */
export default function ClusterButton({ point, mapData, className }: ClusterButtonProps) {
  const [showTuple, setShowTuple] = useState(false);
  const { x, y } = point;
  const dispatch = useDispatch();
  // const clusterList = useSelector((state: RootState) => state.clusters.clusters)

  const buttonClick = () => {
    dispatch(addCluster(mapData))
  }

  return (
    <g className={className}>
      {/* Button circle */}
      <circle
        cx={x}
        cy={y}
        r={5}
        fill="rgb(100,100,100)"
        stroke="#fff"
        strokeWidth="1.5"
        style={{
          cursor: 'pointer',
          // filter: selectedButton === id ? 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' : 'none'
        }}
        onClick={buttonClick}

        onMouseEnter={() => setShowTuple(true)}
        onMouseLeave={() => setShowTuple(false)}
      />

      {/* Label text */}
      {showTuple && <text
        x={x + 10}
        y={y - 10}
        textAnchor="middle"
        dominantBaseline="central"
        fill="#000"
        fontSize="10"
        fontWeight="bold"
        pointerEvents="none"
      >
        {mapData[0]}
      </text>}


    </g>
  );
}
