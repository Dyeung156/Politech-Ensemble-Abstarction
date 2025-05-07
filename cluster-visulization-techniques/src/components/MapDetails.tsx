import { useState, useEffect } from "react";
import { deleteMapIndex } from "@/redux/mapIndicesSlice";
import Accordion from "@/components/Accordion";
import { useDispatch } from "react-redux";
import Papa from "papaparse"
import mapCSV from "@/assets/map_data.csv?raw"

interface OutputData {
    opportunity_districts: string;
    avg_population_density: string;
    democrat_count: string;
    republican_count: string;
    [key: string]: any; // Add this if there are additional dynamic keys
}

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

    useEffect(() => {
        Papa.parse<RowData>(mapCSV, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => 
            {
                const row: RowData = results.data[mapIndex];
                setOutput(row);
            },
        });
    }, []);
    

    return (
        <Accordion title={`District Plan ${mapIndex}`} onDelete={deleteButton} >
            <table className="min-w-full border border-gray-300">
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
            </table>
        </Accordion>
    );
}