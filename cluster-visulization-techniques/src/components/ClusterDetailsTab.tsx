import {useSelector } from "react-redux"
import { RootState } from "@/redux/index";
import ClusterDetails from "@/components/ClusterDetails"

export default function ClusterDetailsTab()
{
    const selectedClusters: [string, number[]][] = useSelector((state: RootState) => state.clusters.clusters)
    return(
        <div>
            {selectedClusters.map(([str, mapIndices], index) =>  
            <ClusterDetails key = {index} mapTuple = {str} mapIndices = {mapIndices}/>)}
        </div>
    )
}