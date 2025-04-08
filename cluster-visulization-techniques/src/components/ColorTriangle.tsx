import ClusterButton from "./ClusterButton";
import { strToArr } from "@/util/deserialize";
import opportunity_district_data from "@/assets/opportunity_district_data.json";
import {pointArrToStr} from "@/util/pointType"
import type point from "@/util/pointType"

function makeTrianglePoints(bottomLeft: point, length: number): point[]
{
  const botX = bottomLeft.x
  const botY = bottomLeft.y

  const rightPoint: point = {
    x: botX + length, 
    y: botY
  }

  //math part is to get height of an equilateral triangle 
  const topPoint: point = {
    x: botX + 0.5 * length,
    y: botY - 0.5 * Math.tan(Math.PI / 3) * length
  }

  return [bottomLeft, rightPoint, topPoint]
}

function makePolygonPoints(trianglePoints: point[]): point[][]
{
  const leftEdgeMedian: point = {x: 0.5 * (trianglePoints[0].x + trianglePoints[2].x), 
                                 y: 0.5 * (trianglePoints[0].y + trianglePoints[2].y)}
  const rightEdgeMedian: point = {x: 0.5 * (trianglePoints[1].x + trianglePoints[2].x), 
                                  y: 0.5 * (trianglePoints[1].y + trianglePoints[2].y)}    
  const baseEdgeMedian: point = {x: 0.5 * (trianglePoints[0].x + trianglePoints[1].x), 
                                y: 0.5 * (trianglePoints[0].y + trianglePoints[1].y)}     
  const triangleMedian: point = {x: trianglePoints[2].x,
                                y: trianglePoints[0].y - (trianglePoints[0].y - trianglePoints[2].y) / 3}       

  const greenPolygon: point[] = [trianglePoints[0], leftEdgeMedian, triangleMedian, baseEdgeMedian]
  const bluePolygon: point[] = [trianglePoints[1], rightEdgeMedian, triangleMedian, baseEdgeMedian, ]
  const redPolygon: point[] = [trianglePoints[2], leftEdgeMedian, triangleMedian, rightEdgeMedian, ]

  return [greenPolygon, bluePolygon, redPolygon]
}

function createCoodrinates(triangleVertices: point[], mapTuple: number[], max: number[]) {
  const triangleMedian: point = {x: triangleVertices[2].x,
                                y: triangleVertices[0].y - (triangleVertices[0].y - triangleVertices[2].y) / 3};
  // the small decimal add is to prevent dividing by 0 error 
  const xPercentage = (mapTuple[2] / (max[2] + 0.00000001)) - (mapTuple[1] / (max[1] + 0.00000001));
  const yPercentage = (mapTuple[2] / (max[2] + 0.00000001)) - (mapTuple[0] / (max[0] + 0.00000001));
  //math = how far left or right the point is from triangle median 
  let xValue = triangleMedian.x + triangleMedian.x * xPercentage;
  //math = how far up or down the point is from triangle median 
  let yValue = triangleMedian.y + (triangleVertices[0].y - triangleMedian.y) * yPercentage;

  return { x: xValue, y: yValue };
}

export default function ColorTriangle() {
  const clusterValues = Object.entries(opportunity_district_data)
  const max = clusterValues.pop()
  const bottomPoint: point = {x: 0, y: 300};
  const trianglePoints: point[] = makeTrianglePoints(bottomPoint, 300);
  const polygonPoints: point[][] = makePolygonPoints(trianglePoints);

  const polylineConfigs = [
    { id: 1, points: pointArrToStr(polygonPoints[2]), fill: "url(#redGradient)" },
    { id: 2, points: pointArrToStr(polygonPoints[0]), fill: "url(#greenGradient)" },
    { id: 3, points: pointArrToStr(polygonPoints[1]), fill: "url(#blueGradient)" }
  ];

  return (
    <svg width="300" height="300" viewBox="0 0 300 310">
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
        points = {pointArrToStr(trianglePoints)} //"150,10 10,250 290,250"
        fill="black"
        stroke="white"
        strokeWidth="2"
      />

      {/* Apply color gradients */}
      {
        polylineConfigs.map((config) => (
          <polyline key={config.id} points={config.points} fill={config.fill} />
        ))
      }

      {
        Array.from(clusterValues).map((clusterPair, index) => {
          if (clusterPair[0] == "max")
            return null

          return <ClusterButton key={index}
            point={createCoodrinates(trianglePoints, strToArr(clusterPair[0]), max![1])}
            mapData={clusterPair}
            className="tooltip bg-amber-100" />
        })
      }

    </svg>
  );
}

