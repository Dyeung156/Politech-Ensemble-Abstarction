import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface selectedClusters{
    clusters: [string, string, number[]][],
    isLocked: boolean
}
const initialState: selectedClusters = {
    clusters: [],
    isLocked: false,
}

export const clusterSlice = createSlice({
    name: "clusters",
    initialState,
    reducers: {
        addCluster: (state, action: PayloadAction<[string, string, number[]]>) => {
            if (state.isLocked) 
                return;

            const incomingCluster = action.payload;
            state.clusters = [];  
            state.clusters.push(incomingCluster);
        },
        wipeCluster: (state) => {
            if (state.isLocked) 
                return;
            state.clusters = [];   
        },
        toggleLock: (state) => {
            state.isLocked = !state.isLocked;
        }
    }
})

export const { addCluster, wipeCluster, toggleLock} = clusterSlice.actions
export default clusterSlice.reducer

