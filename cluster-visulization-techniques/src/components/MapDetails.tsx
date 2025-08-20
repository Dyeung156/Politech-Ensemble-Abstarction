import { useState, useEffect, useRef } from "react";
import { deleteMapIndex } from "@/redux/mapIndicesSlice";
import Accordion from "@/components/Accordion";
import { useDispatch } from "react-redux";
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

interface MapDetailsProps {
    mapIndex: number
}
export default function MapDetails({mapIndex} : MapDetailsProps) 
{
    const dispatch = useDispatch();
    const deleteButton = () => dispatch(deleteMapIndex(mapIndex));
    const [output, setOutput ] = useState<RowData | null>(null);
    const myRef = useRef<HTMLTableElement>(null);

    useEffect(() => 
    {
        Papa.parse<RowData>(mapCSV, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => 
            {
                const row: RowData = results.data[mapIndex];
                setOutput(row);
            },
        });

        // D3 code to visualize the map data
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
                        .data(["Opportunity Districts", "Average Population Density (in 100,000s)", "Democrat Districts", "Republican Districts"])
                        .enter()
                        .append("th")
                        .attr("class", "px-4 py-2 border")
                        .text(d => d);
            // table body
            const tableBody = tableElement.append("tbody");
                // data row
                const dataRow = tableBody.append("tr");
                    // data cells
                    dataRow.selectAll("td")
                        .data([
                            output?.opportunity_districts,
                            output?.avg_population_density.slice(0, 2),
                            output?.democrat_count,
                            output?.republican_count
                        ])
                        .enter()
                        .append("td")
                        .attr("class", "px-4 py-2 border")
                        .text(d => d || "N/A"); 
    }, [output]);
    

    return (
        <Accordion title={`District Plan ${mapIndex}`} onDelete={deleteButton} >
            <div ref={myRef} className="min-w-full border border-gray-300">
            </div>
            {/* <table className="min-w-full border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border">Opportunity Districts</th>
                        <th className="px-4 py-2 border">Average Population Density (100,000)</th>
                        <th className="px-4 py-2 border">Democrat Districts</th>
                        <th className="px-4 py-2 border">Republican Districts</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-4 py-2 border">{output?.opportunity_districts}</td>
                        <td className="px-4 py-2 border">{output?.avg_population_density.slice(0,2)}</td>
                        <td className="px-4 py-2 border">{output?.democrat_count}</td>
                        <td className="px-4 py-2 border">{output?.republican_count}</td>
                    </tr>
                </tbody>
            </table> */}
        </Accordion>
    );
}