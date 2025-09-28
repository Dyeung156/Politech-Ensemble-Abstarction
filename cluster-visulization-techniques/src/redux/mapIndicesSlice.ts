import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface selectedMaps{
    mapIndices: number[]
}
const initialState: selectedMaps = {
    mapIndices: []
}

export const mapIndicesSlice = createSlice({
    name: "maps",
    initialState,
    reducers: {
        addMapIndex: (state, action : PayloadAction<number>) => {
            const newMapIndex = action.payload;
            state.mapIndices = [];
            state.mapIndices.push(newMapIndex);
        },
        addMapIndices: (state, action: PayloadAction<number[]>) => 
        {
            const newIndices: number[] = action.payload;
            state.mapIndices = newIndices;
        },
        wipeMapIndices: (state) => 
        {
            state.mapIndices = [];
        }
    }
}) 

export const {addMapIndex, addMapIndices, wipeMapIndices} = mapIndicesSlice.actions
export default mapIndicesSlice.reducer
