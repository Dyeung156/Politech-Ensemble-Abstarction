import ClusterButton from "./ClusterButton";
import AnchorPoint from "./AnchorPoint";

import cluster_placements from "@/assets/cluster_placements.json";
import opp_district_data from "@/assets/opportunity_districts.json";
import dem_count from "@/assets/democrat_count.json";
import margin_count from "@/assets/median_margin.json"
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
  const dem_count_clusters = Object.entries(dem_count);
  const margin_count_clusters = Object.entries(margin_count);

  const oppMeasures: [string, number[]][] = Object.entries(cluster_placements["Opportunity Districts"]);
  const oppAnchors: [string, number[]][] = Object.entries(anchor_points["Opportunity Districts"]);

  const demMeasures: [string, number[]][] = Object.entries(cluster_placements["Democrat - Republican Districts"]);
  const demAnchors : [string, number[]][] = Object.entries(anchor_points["Democratic - Republican Districts"]);

  const marginMeasures: [string, number[]][] = Object.entries(cluster_placements["Median Margins (%)"]);
  const marginAnchors : [string, number[]][] = Object.entries(anchor_points["Median Margins (%)"]);

  const myRef = useRef<SVGGElement>(null);
  useEffect(() => 
  {
    const legend = d3.select(myRef.current)
    
    // outer rectangle 
    legend.append("rect")
      .attr("x", -15)
      .attr("y", 360)
      .attr("width", 315)
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
    // Democrat - Republican Districts
    legend.append("circle")
      .attr("cx", 135)
      .attr("cy", 420)
      .attr("r", 10)
      .attr("fill", "#8E44AD");
    legend.append("text")
      .attr("x", 150)
      .attr("y", 425)
      .attr("font-size", 10)
      .attr("fill", "black")
      .text("Democrat - Republican Districts");
    // Median Margins (%)
    legend.append("circle")
      .attr("cx", 0)
      .attr("cy", 420)
      .attr("r", 10)
      .attr("fill", "#FF6347");
    legend.append("text")
      .attr("x", 15)
      .attr("y", 425)
      .attr("font-size", 10)
      .attr("fill", "black")
      .text("Median Margin (%)");
  },[]);

  return (
    <div>
        <svg width = "500" height = "500" viewBox = "-80 0 460 410">
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

            {/** Democrat - Republican Districts **/}
            {
              Array.from(dem_count_clusters).map((clusterPair, index) => {
                // const measureData: ClusterMeasures = cluster_measures["Opportunity Districts"][clusterPair[0]];
                return <ClusterButton key={index}
                  point={pointPlacement(demMeasures, clusterPair[0])}
                  mapData={clusterPair}
                  className="tooltip bg-amber-100" 
                  color = "#8E44AD"
                  clusterType = "Democrat - Republican Districts"/>
              })
            }
            {/**Democrat - Republican Districts Anchors */}
            {
              Array.from(demAnchors).map((clusterPair, index) => {
                // const measureData: ClusterMeasures = cluster_measures["Opportunity Districts"][clusterPair[0]];
                return <AnchorPoint key={index}
                  point={pointPlacement(demAnchors, clusterPair[0])}
                  mapData={clusterPair}
                  className="tooltip bg-amber-100" 
                  clusterType = "D - R Districts"
                  />
              })
            }
            {/** Median Margin Percentages **/}
            {
              Array.from(margin_count_clusters).map((clusterPair, index) => {
                // const measureData: ClusterMeasures = cluster_measures["Opportunity Districts"][clusterPair[0]];
                return <ClusterButton key={index}
                  point={pointPlacement(marginMeasures, clusterPair[0])}
                  mapData={clusterPair}
                  className="tooltip bg-amber-100" 
                  color = "red"
                  clusterType = "Median Margins (%)"/>
              })
            }
            {/**Median Margin Percentages Anchors */}
            {
              Array.from(marginAnchors).map((clusterPair, index) => {
                // const measureData: ClusterMeasures = cluster_measures["Opportunity Districts"][clusterPair[0]];
                return <AnchorPoint key={index}
                  point={pointPlacement(marginAnchors, clusterPair[0])}
                  mapData={clusterPair}
                  className="tooltip bg-amber-100" 
                  clusterType = "Median Margins (%)"
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
