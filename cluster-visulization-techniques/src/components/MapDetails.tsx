import { deleteMapIndex } from "@/redux/mapIndicesSlice";
import Accordion from "@/components/Accordion";
import { useDispatch } from "react-redux";

interface MapDetailsProps {
    mapIndex: number
}
export default function MapDetails({mapIndex} : MapDetailsProps) 
{
    const dispatch = useDispatch();
    const deleteButton = () => dispatch(deleteMapIndex(mapIndex));

    return (
        <Accordion title={`Map ${mapIndex}`} onDelete={deleteButton} >
            <div>
                Testing {mapIndex}
            </div>
        </Accordion>
    );
}