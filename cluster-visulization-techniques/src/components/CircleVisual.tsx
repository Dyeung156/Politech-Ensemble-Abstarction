import ClusterButton from "./ClusterButton";
import cluster_measures from "@/assets/cluster_measures.json";
import opp_district_data from "@/assets/opportunity_districts.json";
import avg_pop from "@/assets/avg_population_density.json";
import dem_count from "@/assets/democrat_count.json";
import rep_count from "@/assets/republican_count.json"

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

  const x = Math.cos(avgAngle) * (avgRadiusPercent * radius);
  const y = Math.sin(avgAngle) * (avgRadiusPercent * radius);

  return { x: x + 150, y: y + 150 };
}

export default function CircleVisual() 
{
  const opp_district_clusters = Object.entries(opp_district_data);
  const avg_pop_clusters = Object.entries(avg_pop);
  const dem_count_clusters = Object.entries(dem_count);
  const rep_count_clusters = Object.entries(rep_count);

  const oppMeasures: [string, number[]][] = Object.entries(cluster_measures["Opportunity Districts"]);
  const avgPopMeasures: [string, number[]][] = Object.entries(cluster_measures["Average Population Density"]);
  const demMeasures: [string, number[]][] = Object.entries(cluster_measures["Democrat Districts"]);
  const repMeasures: [string, number[]][] = Object.entries(cluster_measures["Republician Districts"]);

  return (
    <div>
        <svg width = "300" height = "300" viewBox = "0 0 300 300">
            <circle cx="150" cy="150"  r="125"
            fill="blue" stroke="black" strokeWidth="2" />

            {
              Array.from(opp_district_clusters).map((clusterPair, index) => {
                // const measureData: ClusterMeasures = cluster_measures["Opportunity Districts"][clusterPair[0]];
                return <ClusterButton key={index}
                  point={pointPlacement(oppMeasures, clusterPair[0], 125)}
                  mapData={clusterPair}
                  className="tooltip bg-amber-100" />
              })
            }

            {
              Array.from(avg_pop_clusters).map((clusterPair, index) => {
                // console.log(pointPlacement(measureTesting, clusterPair[0], 125))
                // const measureData: ClusterMeasures = cluster_measures["Opportunity Districts"][clusterPair[0]];
                return <ClusterButton key={index}
                  point={pointPlacement(avgPopMeasures, clusterPair[0], 125)}
                  mapData={clusterPair}
                  className="tooltip bg-amber-100" />
              })
            }

            {
              Array.from(dem_count_clusters).map((clusterPair, index) => {
                // const measureData: ClusterMeasures = cluster_measures["Opportunity Districts"][clusterPair[0]];
                return <ClusterButton key={index}
                  point={pointPlacement(demMeasures, clusterPair[0], 125)}
                  mapData={clusterPair}
                  className="tooltip bg-amber-100" />
              })
            }

            {
              Array.from(rep_count_clusters).map((clusterPair, index) => {
                // const measureData: ClusterMeasures = cluster_measures["Opportunity Districts"][clusterPair[0]];
                return <ClusterButton key={index}
                  point={pointPlacement(repMeasures, clusterPair[0], 125)}
                  mapData={clusterPair}
                  className="tooltip bg-amber-100" />
              })
            }


        </svg>
    </div>
  );
}
