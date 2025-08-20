import ClusterButton from "./ClusterButton";
import AnchorPoint from "./AnchorPoint";

import cluster_placements from "@/assets/cluster_placements.json";
import opp_district_data from "@/assets/opportunity_districts.json";
import avg_pop from "@/assets/avg_population_density.json";
import dem_count from "@/assets/democrat_count.json";
import rep_count from "@/assets/republican_count.json"
import anchor_points from "@/assets/anchor_points.json";

import {useEffect, useRef} from "react";
import * as d3 from "d3";

function pointPlacement(measuresData: [string, number[]][], clusterValue: string) 
{
  let x = 0;
  let y = 0;
  for (const measure of measuresData) 
  {
    if (measure[0] != clusterValue) 
      continue;

    x = measure[1][0]
    y = measure[1][1]
    return { x, y };

  }

  return { x, y};
}

export default function CircleVisual() 
{
  const opp_district_clusters = Object.entries(opp_district_data);
  const avg_pop_clusters = Object.entries(avg_pop);
  const dem_count_clusters = Object.entries(dem_count);
  const rep_count_clusters = Object.entries(rep_count);

  const oppMeasures: [string, number[]][] = Object.entries(cluster_placements["Opportunity Districts"]);
  const oppAnchors: [string, number[]][] = Object.entries(anchor_points["Opportunity Districts"]);

  const avgPopMeasures: [string, number[]][] = Object.entries(cluster_placements["Average Population Density"]);
  const avgPopAnchors : [string, number[]][] = Object.entries(anchor_points["Average Population Density"]);

  const demMeasures: [string, number[]][] = Object.entries(cluster_placements["Democrat Districts"]);
  const demAnchors : [string, number[]][] = Object.entries(anchor_points["Democrat Districts"]);

  const repMeasures: [string, number[]][] = Object.entries(cluster_placements["Republician Districts"]);
  const repAnchors : [string, number[]][] = Object.entries(anchor_points["Republician Districts"]);

  const myRef = useRef<SVGGElement>(null);
  useEffect(() => 
  {
    const legend = d3.select(myRef.current)
    
    // outer rectangle 
    legend.append("rect")
      .attr("x", -15)
      .attr("y", 360)
      .attr("width", 300)
      .attr("height", 75)
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("stroke-width", 2);
    // Legend text
    legend.append("text")
      .attr("x", 0)
      .attr("y", 375)
      .attr("font-size", 15)
      .attr("fill", "black")
      .text("Legend");
    // Opportunity Districts
    legend.append("circle")
      .attr("cx", 0)
      .attr("cy", 390)
      .attr("r", 10)
      .attr("fill", "#9caf88");
    legend.append("text")
      .attr("x", 15)
      .attr("y", 395)
      .attr("font-size", 10)
      .attr("fill", "black")
      .text("Opportunity Districts");
    // Average Population Density
    legend.append("circle")
      .attr("cx", 135)
      .attr("cy", 390)
      .attr("r", 10)
      .attr("fill", "gold");
    legend.append("text")
      .attr("x", 150)
      .attr("y", 395)
      .attr("font-size", 10)
      .attr("fill", "black")
      .text("Average Population Density");
    // Democrat Districts
    legend.append("circle")
      .attr("cx", 0)
      .attr("cy", 420)
      .attr("r", 10)
      .attr("fill", "#87CEFA");
    legend.append("text")
      .attr("x", 15)
      .attr("y", 425)
      .attr("font-size", 10)
      .attr("fill", "black")
      .text("Democrat Districts");
    // Republican Districts
    legend.append("circle")
      .attr("cx", 135)
      .attr("cy", 420)
      .attr("r", 10)
      .attr("fill", "#FF6347");
    legend.append("text")
      .attr("x", 150)
      .attr("y", 425)
      .attr("font-size", 10)
      .attr("fill", "black")
      .text("Republican Districts");
  },[]);

  return (
    <div>
        <svg width = "500" height = "500" viewBox = "-80 0 460 405">
            <circle cx="150" cy="150"  r="175"
            fill="#778899 " stroke="black" strokeWidth="2" />

            {/** Opportunity Districts **/}
            {
              Array.from(opp_district_clusters).map((clusterPair, index) => {
                // const measureData: ClusterMeasures = cluster_measures["Opportunity Districts"][clusterPair[0]];
                return <ClusterButton key={index}
                  point={pointPlacement(oppMeasures, clusterPair[0])}
                  mapData={clusterPair}
                  className="tooltip bg-amber-100"
                  color = "#9caf88"
                  clusterType = "Opportunity Districts" />
              })
            }
            {/**Opp Distirct Anchors */}
            {
              Array.from(oppAnchors).map((clusterPair, index) => {
                // const measureData: ClusterMeasures = cluster_measures["Opportunity Districts"][clusterPair[0]];
                return <AnchorPoint key={index}
                  point={pointPlacement(oppAnchors, clusterPair[0])}
                  mapData={clusterPair}
                  className="tooltip bg-amber-100" 
                  clusterType = "Opportunity Districts"
                  />
              })
            }
            {/** Average Population Density **/}

            {
              Array.from(avg_pop_clusters).map((clusterPair, index) => {
                // console.log(pointPlacement(measureTesting, clusterPair[0], 125))
                // const measureData: ClusterMeasures = cluster_measures["Opportunity Districts"][clusterPair[0]];
                return <ClusterButton key={index}
                  point={pointPlacement(avgPopMeasures, clusterPair[0])}
                  mapData={clusterPair}
                  className="tooltip bg-amber-100" 
                  color = "gold"
                  clusterType = "Average Population Density"/>
              })
            }

            {/**Avg Pop Density Anchors */}
            {
              Array.from(avgPopAnchors).map((clusterPair, index) => {
                // const measureData: ClusterMeasures = cluster_measures["Opportunity Districts"][clusterPair[0]];
                return <AnchorPoint key={index}
                  point={pointPlacement(avgPopAnchors, clusterPair[0])}
                  mapData={clusterPair}
                  className="tooltip bg-amber-100" 
                  clusterType = "Average Population Density"
                  />
              })
            }

            {/** Democrat Districts **/}
            {
              Array.from(dem_count_clusters).map((clusterPair, index) => {
                // const measureData: ClusterMeasures = cluster_measures["Opportunity Districts"][clusterPair[0]];
                return <ClusterButton key={index}
                  point={pointPlacement(demMeasures, clusterPair[0])}
                  mapData={clusterPair}
                  className="tooltip bg-amber-100" 
                  color = "#87CEFA"
                  clusterType = "Democrat Districts"/>
              })
            }
            {/**Democrat Districts Anchors */}
            {
              Array.from(demAnchors).map((clusterPair, index) => {
                // const measureData: ClusterMeasures = cluster_measures["Opportunity Districts"][clusterPair[0]];
                return <AnchorPoint key={index}
                  point={pointPlacement(demAnchors, clusterPair[0])}
                  mapData={clusterPair}
                  className="tooltip bg-amber-100" 
                  clusterType = "Democrat Districts"
                  />
              })
            }
            {/** Republican Districts **/}
            {
              Array.from(rep_count_clusters).map((clusterPair, index) => {
                // const measureData: ClusterMeasures = cluster_measures["Opportunity Districts"][clusterPair[0]];
                return <ClusterButton key={index}
                  point={pointPlacement(repMeasures, clusterPair[0])}
                  mapData={clusterPair}
                  className="tooltip bg-amber-100" 
                  color = "red"
                  clusterType = "Republican Districts"/>
              })
            }
            {/**Republican Distirct Anchors */}
            {
              Array.from(repAnchors).map((clusterPair, index) => {
                // const measureData: ClusterMeasures = cluster_measures["Opportunity Districts"][clusterPair[0]];
                return <AnchorPoint key={index}
                  point={pointPlacement(repAnchors, clusterPair[0])}
                  mapData={clusterPair}
                  className="tooltip bg-amber-100" 
                  clusterType = "Republican Districts"
                  />
              })
            }

            {/** Legend */}
            <g ref = {myRef} transform="translate(25, 0)" >
              {/* <rect x="-15" y="-10" width="300" height="75" fill="none" stroke="gray" strokeWidth="2" />
              <text x="0" y="5" fontSize="15" fill="black">Legend</text>
              <circle cx="0" cy="20" r="10" fill="#9caf88" />
              <text x="15" y="25" fontSize="10" fill="black">Opportunity Districts</text>
              <circle cx="135" cy="20" r="10" fill="gold" />
              <text x="150" y="25" fontSize="10" fill="black">Average Population Density</text>
              <circle cx="0" cy="50" r="10" fill="#87CEFA"/>
              <text x="15" y="50" fontSize="10" fill="black">Democrat Districts</text>
              <circle cx="135" cy="50" r="10" fill="#FF6347"/>
              <text x="150" y="50" fontSize="10" fill="black">Republican Districts</text> */}
            </g>
        </svg>
    </div>
  );
}
