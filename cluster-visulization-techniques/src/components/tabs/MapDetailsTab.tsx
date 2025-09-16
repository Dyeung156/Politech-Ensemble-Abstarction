import {useSelector } from "react-redux"
import { RootState } from "@/redux/index";
import {useEffect, useRef} from "react";
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
    const selectedMaps: number[] = useSelector((state: RootState) => state.mapIndices.mapIndices);
    const selectedClusters: [string, string, number[]][] = useSelector((state: RootState) => state.clusters.clusters)
    const myRef = useRef<HTMLDivElement>(null);

    const detailTitle = `${selectedClusters[0][0]}: ${selectedClusters[0][1]}`

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
                outputData = selectedMaps.map(index => results.data[index]).filter(Boolean);
            },
        });


        const table = d3.select(myRef.current);
        // clear out any previous content
        table.selectAll("*").remove();
        
        // table element
        const tableElement = table.append("table")
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

            outputData.forEach((output, index) => 
            {
                // data row
                const dataRow = tableBody.append("tr");
                    // data cells
                    dataRow.selectAll("td")
                        .data([
                            selectedMaps[index],
                            output?.opportunity_districts,
                            output?.avg_population_density.slice(0, 2),
                            output?.democrat_count,
                            output?.republican_count
                        ])
                        .enter()
                        .append("td")
                        .attr("class", "px-4 py-2 border")
                        .text(d => d || "N/A"); 
            })
    }, [selectedMaps])


    return(
        <div>
            <div ref = {myRef}>
            {/* {selectedMaps.map((mapValue, index) =>  
            <MapDetails key = {index} mapIndex = {mapValue}/>)} */}
            </div>

            <div>
                <h2 className="text-center text-lg font-semibold mt-4 mb-2">{detailTitle}</h2>
            </div>
        </div>
        
    )
}