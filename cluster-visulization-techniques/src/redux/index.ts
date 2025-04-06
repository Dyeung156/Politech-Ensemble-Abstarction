import { configureStore } from "@reduxjs/toolkit";
import clusterSlice from "@/redux/clusterSlice"
import mapIndicesSlice from "@/redux/mapIndicesSlice"

export const store = configureStore({
    reducer: {
        clusters: clusterSlice,
        mapIndices: mapIndicesSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch