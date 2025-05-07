import { deleteCluster } from "@/redux/clusterSlice"
import { addMapIndex } from "@/redux/mapIndicesSlice";
import { useDispatch } from "react-redux";

import Accordion from "@/components/Accordion";
import ValueTable from "@/components/ValueTable";

interface AccordionValues {
    clusterType: string
    mapTuple: string
    mapIndices: number[]
}
export default function ClusterDetails({ clusterType, mapTuple, mapIndices }: AccordionValues) {
    const dispatch = useDispatch();
    const deleteButton = () => dispatch(deleteCluster([clusterType, mapTuple, mapIndices]));

    const detailTitle = `${clusterType}: ${mapTuple}`
    return (
        <Accordion title = {detailTitle} onDelete={deleteButton} >
            {/* Table showing cluster values */}
            <ValueTable clusterType = {clusterType} mapValue = {mapTuple}/>

            {/* Open District Plan Info */}
            <div className="text-gray-500">Map Indices:
                {mapIndices.map((mapValue, index) => 
                <button className="border border-gray-300 rounded px-2 py-1 hover:border-gray-500" 
                key={index} onClick={() => dispatch(addMapIndex(mapValue))}>{mapValue}</button>)}
            </div>
        </Accordion>
    )
}