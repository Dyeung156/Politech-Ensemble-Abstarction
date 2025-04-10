import {useSelector } from "react-redux"
import { RootState } from "@/redux/index";
import MapDetails from "@/components/MapDetails";

export default function MapDetailsTab()
{
    const selectedMaps: number[] = useSelector((state: RootState) => state.mapIndices.mapIndices);

    return(
        <div>
            {selectedMaps.map((mapValue, index) =>  
            <MapDetails key = {index} mapIndex = {mapValue}/>)}
        </div>
    )
}