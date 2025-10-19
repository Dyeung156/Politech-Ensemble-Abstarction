import {useSelector } from "react-redux"
import { RootState } from "@/redux/index";
import { cluster } from "@/redux/clusterSlice";
import ClusterDetails from "@/components/ClusterDetails"

export default function ClusterDetailsTab()
{
    const selectedCluster: cluster | null = useSelector((state: RootState) => state.clusters.cluster);

    if (!selectedCluster)
    {
        return <div></div>;
    }

    return(
        <div>
            <ClusterDetails clusterType = {selectedCluster.anchorType} 
                            mapTuple = {selectedCluster.anchorValue} />
        </div>
    );
}