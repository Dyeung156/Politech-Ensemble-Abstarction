import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface cluster
{
    anchorType: string,
    anchorValue: string, 
    mapIndices: number[]
}

export interface selectedCluster
{
    cluster: cluster | null,
    isLocked: boolean
}

const initialState: selectedCluster = 
{
    cluster: null,
    isLocked: false,
}

export const clusterSlice = createSlice({
    name: "clusters",
    initialState,
    reducers: {
        addCluster: (state, action: PayloadAction<cluster>) => {
            if (state.isLocked) 
                return;
            state.cluster = action.payload;
        },
        wipeCluster: (state) => {
            if (state.isLocked) 
                return;
            state.cluster = null;   
        },
        lockOn: (state) => {
            state.isLocked = true;
        },
        lockOff: (state) => {
            state.isLocked = false;
        }
    }
})

export const { addCluster, wipeCluster, lockOn, lockOff} = clusterSlice.actions
export default clusterSlice.reducer

