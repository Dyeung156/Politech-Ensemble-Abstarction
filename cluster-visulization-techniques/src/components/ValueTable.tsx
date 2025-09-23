import cluster_range_json from "@/assets/cluster_ranges.json"
import cluster_avg_json from "@/assets/cluster_avg.json"
import {useEffect, useRef} from "react";
import * as d3 from "d3";

interface ClusterRanges
{
    [key : string] : 
    {
        [key : string] : number[][];
    }
}

interface ClusterAvgs{
    [key : string] :
    {
        [key : string] : number[];
    }
}

interface ValueTableProps {
    clusterType: string;
    mapValue: string;
}

export default function ValueTable({ clusterType, mapValue }: ValueTableProps)
{
    const all_ranges: ClusterRanges = cluster_range_json
    const all_avg: ClusterAvgs = cluster_avg_json

    // get the values for the cluster type and map tuple
    const ranges = all_ranges[clusterType][mapValue];
    const avg = all_avg[clusterType][mapValue];
    const category_names = ["Opportunity Districts", "Average Population Density (100,000)", "Democratic Districts", "Republican Districts"]

    const myRef = useRef<HTMLDivElement>(null);
    useEffect(() =>
    {
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
                        .data(["Category", "Range", "Average"])
                        .enter()
                        .append("th")
                        .attr("class", "px-4 py-2 border")
                        .text(d => d);
            // table body
            const tableBody = tableElement.append("tbody");
                // data rows
                ranges.forEach((row, index) => {
                    const dataRow = tableBody.append("tr");
                    dataRow.selectAll("td")
                        .data([category_names[index], `${row[0]} - ${row[1]}`, avg[index]])
                        .enter()
                        .append("td")
                        .attr("class", "px-4 py-2 border")
                        .text(d => d);
                });
    }, [ranges, avg, category_names]);

    return (
        <div ref = {myRef}>
            {/* <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
                <tr>
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Range</th>
                <th className="px-4 py-2 border">Average</th>
                </tr>
            </thead>
            <tbody>
                {ranges.map((row, index) => (
                <tr key={index}>
                    <td className="px-4 py-2 border">{category_names[index]}</td>
                    <td className="px-4 py-2 border">{row[0]} - {row[1]}</td>
                    <td className="px-4 py-2 border">{avg[index]}</td>
                </tr>
                ))}
            </tbody>
            </table> */}
        </div>
            
    )

}