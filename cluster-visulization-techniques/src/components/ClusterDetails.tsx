import { deleteCluster } from "@/redux/clusterSlice"
import { useDispatch } from "react-redux";
import Accordion from "./Accordion";

interface AccordionValues {
    mapTuple: string
    mapIndices: number[]
}
export default function ClusterDetails({ mapTuple, mapIndices }: AccordionValues) {
    const dispatch = useDispatch();
    const deleteButton = () => dispatch(deleteCluster(mapTuple));

    return (
        <Accordion title={mapTuple} onDelete={deleteButton} >
            {mapIndices.map((mapValue, index) => <button key={index}>{mapValue}</button>)}
        </Accordion>
    )
}