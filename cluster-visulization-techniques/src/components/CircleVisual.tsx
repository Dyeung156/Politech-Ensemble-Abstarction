import ClusterButton from "./ClusterButton";
import type point from "@/util/pointType";
import cluster_measures from "@/assets/cluster_measures.json";
import opp_district_data from "@/assets/opportunity_districts.json";

function pointPlacement(measures_data: [string, unknown][], cluster_name: string, cluster_value: number)
{
}


export default function CircleVisual() {
  const opp_district_clusters = Object.entries(opp_district_data);
  const measures = Object.entries(cluster_measures);

  return (
    <div>
        <svg width = "300" height = "300" viewBox = "0 0 300 300">
            <circle cx="150" cy="150"  r="125"
            fill="blue" stroke="black" strokeWidth="2" />

            {
              Array.from(opp_district_clusters).map((clusterPair, index) => {
                return <ClusterButton key={index}
                  point={pointPlacement(clusterPair)}
                  mapData={clusterPair}
                  className="tooltip bg-amber-100" />
              })
            }


        </svg>
    </div>
  );
}