import { useState } from "react";
import {useDispatch } from "react-redux"
// import { RootState } from "@/redux/index";
import {addCluster} from "@/redux/clusterSlice"

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
  // const clusterList = useSelector((state: RootState) => state.clusters.clusters)

  const buttonClick = () => {
    const [mapTuple, mapIndices] = mapData;
    dispatch(addCluster([clusterType, mapTuple, mapIndices]));
  }

  return (
    <g className={className}>
      {/* Button circle */}
      <circle
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
      />

      {/* Label text */}
      {showTuple && <text
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
      </text>}


    </g>
  );
}
