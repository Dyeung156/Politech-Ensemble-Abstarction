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
            const incomingMapTuple = action.payload[0];
            const previousMapTuples = state.clusters.map(([key]) => key);
            
            // check if the incoming map tuple is already included 
            if (previousMapTuples.includes(incomingMapTuple))
                return

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

