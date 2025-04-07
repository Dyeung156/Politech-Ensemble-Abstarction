import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface selectedClusters{
    clusters: [string, number[]][]
}
const initialState: selectedClusters = {
    clusters: []
}

export const clusterSlice = createSlice({
    name: "clusters",
    initialState,
    reducers: {
        addCluster: (state, action: PayloadAction<[string, number[]]>) => {
            const incomingCluster = action.payload;

            // check if the incoming cluster is new 
            if (!state.clusters.includes(incomingCluster))
                state.clusters.push(incomingCluster);
            
        },
        deleteCluster: (state, action: PayloadAction<[string, number[]]>) => {
            const clusterTuple = action.payload[0];
            
            state.clusters.filter(([str, _]) => str != clusterTuple);
        }
    }
})

export const { addCluster, deleteCluster } = clusterSlice.actions
export default clusterSlice.reducer

