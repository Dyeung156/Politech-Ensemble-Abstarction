import { deleteCluster } from "@/redux/clusterSlice"
import { addMapIndex } from "@/redux/mapIndicesSlice";
import { useDispatch } from "react-redux";
import Accordion from "./Accordion";

interface AccordionValues {
    mapTuple: string
    mapIndices: number[]
}
export default function ClusterDetails({ mapTuple, mapIndices }: AccordionValues) {
    const dispatch = useDispatch();
    const deleteButton = () => dispatch(deleteCluster(mapTuple));

    const mapTupleArray = mapTuple.split("-");
    const accordionTitle = `(${mapTupleArray.join(",")})`;

    return (
        <Accordion title={accordionTitle} onDelete={deleteButton} >
            {mapIndices.map((mapValue, index) => 
            <button className="border border-gray-300 rounded px-2 py-1 hover:border-gray-500" 
            key={index} onClick={() => dispatch(addMapIndex(mapValue))}>{mapValue}</button>)}
        </Accordion>
    )
}