import {useSelector } from "react-redux"
import { RootState } from "@/redux/index";
import ClusterDetails from "@/components/ClusterDetails"

export default function ClusterDetailsTab()
{
    const selectedClusters: [string, string, number[]][] = useSelector((state: RootState) => state.clusters.clusters)
    return(
        <div>
            {selectedClusters.map(([incomingType, clusterValue, mapIndices], index) =>  
            <ClusterDetails key = {index} 
                            clusterType = {incomingType} 
                            mapTuple = {clusterValue} 
                            mapIndices = {mapIndices}/>)}
        </div>
    )
}