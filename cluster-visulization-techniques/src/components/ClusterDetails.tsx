import { deleteCluster } from "@/redux/clusterSlice"
import { addMapIndex, addMapIndices } from "@/redux/mapIndicesSlice";
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
            <button className="text-gray-500 border border-gray-300 rounded px-2 py-1 hover:border-gray-500"
            onClick = {() => dispatch(addMapIndices(mapIndices))} >
                Look at District Plan Information
            </button>
        </Accordion>
    )
}