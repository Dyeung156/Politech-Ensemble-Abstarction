import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface selectedClusters{
    clusters: [string, string, number[]][]
}
const initialState: selectedClusters = {
    clusters: [],
}

function includesCluster(previousClusters: [string, string][], clusterType: string, mapTuple: string)
{
    // Check if the cluster type and map tuple are included in the state clusters
    return previousClusters.some(([previousType, previousTuple]) => 
        previousType === clusterType && previousTuple === mapTuple);
}

function hasMapIndices(indexCollection: number[][], newCluster: number[]) 
{
    // Check if any sub-array in the index collection matches the new indices array
    return indexCollection.some(subArray => {
        // Only proceed if lengths match
        if (subArray.length !== newCluster.length) return false;

        // Check if all map indices match
        return subArray.every((value, index) => value === newCluster[index]);
        });
}
  

export const clusterSlice = createSlice({
    name: "clusters",
    initialState,
    reducers: {
        addCluster: (state, action: PayloadAction<[string, string, number[]]>) => {
            const incomingCluster = action.payload;
            const clusterType: string = incomingCluster[0];
            const incomingMapTuple: string = incomingCluster[1];
            const incomingMapIndices: number[] = incomingCluster[2];

            const previousClusters: [string, string][] = state.clusters.map(([strType, mapTuple, _]) => [strType, mapTuple]);
            
            // check if the incoming map tuple is already included 
            if (includesCluster(previousClusters, clusterType, incomingMapTuple)) {
                // if incoming map tuple is already included, check if it has the same map indices 
                if (hasMapIndices(state.clusters.map(([strType, mapTuple, indices]) => indices), incomingMapIndices))
                    return;
            }
            state.clusters.push(incomingCluster);
        },
        deleteCluster: (state, action: PayloadAction<[string, string, number[]]>) => {
            const incomingCluster = action.payload;
            const clusterType: string = incomingCluster[0];
            const incomingMapTuple: string = incomingCluster[1];
            const incomingMapIndices: number[] = incomingCluster[2];
            
            state.clusters = state.clusters.filter(([previousType, mapTuple, mapValues]) => 
                previousType !== clusterType || mapTuple !== incomingMapTuple || 
                !mapValues.every((value, index) => value === incomingMapIndices[index])
            );
        }
    }
})

export const { addCluster, deleteCluster } = clusterSlice.actions
export default clusterSlice.reducer

