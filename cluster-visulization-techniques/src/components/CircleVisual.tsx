import ClusterButton from "./ClusterButton";
import type point from "@/util/pointType";
import cluster_measures from "@/assets/cluster_measures.json";
import opp_district_data from "@/assets/opportunity_districts.json";

interface ClusterMeasures {
    cluster: [string, number[]][]
};

function pointPlacement(measuresData: [string, number[]][], clusterValue: string, radius: number) 
{
  let avgRadiusPercent = 0;
  let avgAngle = 0;
  for (const measure of measuresData) 
  {
    if (measure[0] != clusterValue) 
      continue;

    avgRadiusPercent = (measure[1][0] * radius) / 100;
    avgAngle = measure[1][1] * Math.PI / 180;

  }

  console.log(avgRadiusPercent)
  const x = Math.cos(avgAngle) * (avgRadiusPercent * radius);
  const y = Math.sin(avgAngle) * (avgRadiusPercent * radius);

  return { x: x + 150, y: y + 150 };
}


export default function CircleVisual() 
{
  const opp_district_clusters = Object.entries(opp_district_data);
  const measureTesting: [string, number[]][] = Object.entries(cluster_measures["Opportunity Districts"]);
  console.log(measureTesting);
  // console.log(measures);
  // console.log(pointPlacement(measures, "4", 125));

  return (
    <div>
        <svg width = "300" height = "300" viewBox = "0 0 300 300">
            <circle cx="150" cy="150"  r="125"
            fill="blue" stroke="black" strokeWidth="2" />

            {
              Array.from(opp_district_clusters).map((clusterPair, index) => {
                // const measureData: ClusterMeasures = cluster_measures["Opportunity Districts"][clusterPair[0]];
                return <ClusterButton key={index}
                  point={pointPlacement(measureTesting, clusterPair[0], 125)}
                  mapData={clusterPair}
                  className="tooltip bg-amber-100" />
              })
            }


        </svg>
    </div>
  );
}
