import {useSelector } from "react-redux"
import { RootState } from "@/redux/index";
import {cluster} from "@/redux/clusterSlice";
import {useEffect, useRef, useState} from "react";
import Papa from "papaparse"
import mapCSV from "@/assets/map_data.csv?raw"
import * as d3 from "d3";

interface RowData {
    map_id: string;
    opportunity_districts: string;
    avg_population_density: string;
    democrat_count: string;
    republican_count: string;
    radius: string;
    angle: string;
    [key: string]: any; // Add this if there are additional dynamic keys
}

export default function MapDetailsTab()
{
    const selectedCluster: cluster = useSelector((state: RootState) => state.clusters.cluster)!;
    const myRef = useRef<HTMLDivElement>(null);

    const [ allMapData, setAllMapData ] = useState<RowData[]>([]);
    const [ displayRow, setDisplayRow ] = useState<number>(0);
    const rowsPerPage = 10;

    const detailTitle = `${selectedCluster.anchorType}: ${selectedCluster.anchorValue}`;

    // effect when the redux slice changes 
    useEffect(() =>
    {
        let outputData: RowData[] = [];
        //parse the CSV file and get the selected rows
        //is async so can't move out of useEffect w/o extra work
        Papa.parse<RowData>(mapCSV, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => 
            {
                outputData = selectedCluster.mapIndices.map(index => results.data[index]).filter(Boolean);
            },
        });

        setAllMapData(outputData);
    }, [selectedCluster])

    // effect when page changes 
    useEffect(() => 
    {
        const tab = d3.select(myRef.current);
        // clear out any previous content
        tab.selectAll("*").remove();
        
        // table element
        const tableElement = tab.append("table")
            .attr("class", "min-w-full border border-gray-300");
            // table header 
            const tableHeader = tableElement.append("thead")
                .attr("class", "bg-gray-100");
                // header row 
                const headerRow = tableHeader.append("tr");
                    // header cells
                    headerRow.selectAll("th")
                        .data(["Plan Number", "Opportunity Districts", "Average Population Density (in 100,000s)", "Democrat Districts", "Republican Districts"])
                        .enter()
                        .append("th")
                        .attr("class", "px-4 py-2 border")
                        .text(d => d);
            // table body
            const tableBody = tableElement.append("tbody");
            
            for (let i = displayRow; i < Math.min(displayRow + rowsPerPage, allMapData.length); i++)
            {
                const dataRow = allMapData[i];
                const tableRow = tableBody.append("tr");
                    // data cells
                    tableRow.selectAll("td")
                        .data([
                            dataRow?.map_id ?? i,
                            dataRow?.opportunity_districts,
                            dataRow?.avg_population_density.slice(0, 2),
                            dataRow?.democrat_count,
                            dataRow?.republican_count
                        ])
                        .enter()
                        .append("td")
                        .attr("class", "px-4 py-2 border")
                        .text(d => d ?? "N/A"); 
            }

        const buttonContainer = tab.append("div")
            .attr("class", "flex items-center gap-2 mt-2");
            buttonContainer.append("button")
                .attr("class", "px-3 py-1 border rounded")
                .text("<-")
                .on("click", () => setDisplayRow(row => Math.max(0, row - rowsPerPage)));
            
            buttonContainer.append("span")
                .attr("class", "mx-2 text-sm text-gray-600")
                .text(() => {
                    const start = displayRow + 1;
                    const end = Math.min(allMapData.length, displayRow + rowsPerPage);
                    return `Showing ${start} - ${end} of ${allMapData.length}`;
                });

            buttonContainer.append("button")
                .attr("class", "px-3 py-1 border rounded")
                .text("->")
                .on("click", () => setDisplayRow(row => Math.min(allMapData.length, row + rowsPerPage)));
            

    }, [allMapData, displayRow])

    return(
        <div>
            
            <div ref = {myRef}>
            {/* {selectedMaps.map((mapValue, index) =>  
            <MapDetails key = {index} mapIndex = {mapValue}/>)} */}
            </div>

            
            <h2 className="text-center text-lg font-semibold mt-4 mb-2">{detailTitle}</h2>
            
        </div>
        
    )
}