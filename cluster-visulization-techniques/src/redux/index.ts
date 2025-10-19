import { configureStore } from "@reduxjs/toolkit";
import clusterSlice from "@/redux/clusterSlice"
import {enableMapSet} from "immer"

enableMapSet()

export const store = configureStore({
    reducer: {
        clusters: clusterSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch