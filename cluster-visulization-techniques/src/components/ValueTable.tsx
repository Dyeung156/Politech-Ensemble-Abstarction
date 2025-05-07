import cluster_range_json from "@/assets/cluster_ranges.json"
import cluster_avg_json from "@/assets/cluster_avg.json"

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
    const category_names = ["Opportunity Districts", "Average Population Density (100,000)", "Democrat Districts", "Republican Districts"]

    return (
        <table className="min-w-full border border-gray-300">
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
        </table>
    )

}