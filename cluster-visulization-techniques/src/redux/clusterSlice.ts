import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface selectedClusters{
    clusters: Map<string, number[]>
}
const initialState: selectedClusters = {
    clusters: new Map<string, number[]>()
}

export const clusterSlice = createSlice({
    name: "clusters",
    initialState,
    reducers: {
        addCluster: (state, action: PayloadAction<Map<string, number[]>>) => {
            const incomingCluster = action.payload;
            
            //incoming cluster will always have 1 key so can extract it directly 
            const clusterTuple = Array.from(incomingCluster.keys())[0];
            // mapIndices will never be undefined, hence the !
            const mapIndices = incomingCluster.get(clusterTuple)!;

            // check if clusterTuple is NOT in clusters yet
            if (!state.clusters.has(clusterTuple))
                state.clusters.set(clusterTuple, mapIndices);
            
        },
        deleteCluster: (state, action: PayloadAction<Map<string, number[]>>) => {
            const incomingCluster = action.payload;
            
            //incoming cluster will always have 1 key so can extract it directly 
            const clusterTuple = Array.from(incomingCluster.keys())[0];
            // if the cluster tuple was not in state, notify thru the console 
            if (!state.clusters.delete(clusterTuple))
                console.log(`${clusterTuple} was not found for some reason.`)
        }
    }
})

export const { addCluster, deleteCluster } = clusterSlice.actions
export default clusterSlice.reducer

