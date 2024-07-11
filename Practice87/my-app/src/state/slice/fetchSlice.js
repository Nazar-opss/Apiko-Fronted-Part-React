import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

const fetchSlice = createSlice({
    name:'fetch',
    initialState,
    reducers: {
        fetchStore(state, action) {
            state.fetchStore += state.fetchStore;
        }
    }
})
export const { fetchStore } = fetchSlice.actions

export default fetchSlice.reducer