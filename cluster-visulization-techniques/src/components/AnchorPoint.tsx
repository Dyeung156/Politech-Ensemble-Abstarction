import point from "@/util/pointType";

interface AnchorPointProps {
    point: {
      x: number
      y: number
    }
    mapData: [string, number[]]
    className?: string
    clusterType?: string
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

  return (
    <g className={className}>
      {/* Button circle */}
      <circle
        cx={x}
        cy={300 - y}
        r={5}
        fill={"black"}
        stroke="#000"
        strokeWidth="1.5"
        style={{
          cursor: 'pointer',
          // filter: selectedButton === id ? 'drop-shadow(0 0 4px rgba(255,255,255,0.8))' : 'none'
        }}

      />

      {/* Label text */}
      <text
        x={textX}
        y={300 - y + 15}
        textAnchor="middle"
        dominantBaseline="central"
        fill = "#333333"
        fontSize="10.5"
        fontWeight="bold"
        pointerEvents="none"
      >
        <tspan x={textX} dy="0" textAnchor="middle"> {clusterType} </tspan>
        <tspan x = {textX} dy = "10" textAnchor="middle"> {mapData[0]} </tspan>
      </text>


    </g>
  );

}