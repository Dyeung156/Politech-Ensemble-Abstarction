import ClusterButton from "./ClusterButton";
import type point from "@/util/pointType"

export default function CircleVisual() {

  
  return (
    <div>
        <svg width = "300" height = "300" viewBox = "0 0 300 300">
            <circle cx="150" cy="150"  r="125"
            fill="blue" stroke="black" strokeWidth="2" />
        </svg>
    </div>
  );
}