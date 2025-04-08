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
            const newMapIndex = action.payload
            //add the new map index if it is not in the state already 
            if (!state.mapIndices.includes(newMapIndex))
                state.mapIndices.push(newMapIndex)
        },
        deleteMapIndex: (state, action: PayloadAction<number>) => {
            const mapIndex = action.payload
            //check that the map index is in the state before filtering the array 
            if (state.mapIndices.includes(mapIndex))
                state.mapIndices.filter(num => num !== mapIndex)
        } 
    }
}) 

export const {addMapIndex, deleteMapIndex } = mapIndicesSlice.actions
export default mapIndicesSlice.reducer
