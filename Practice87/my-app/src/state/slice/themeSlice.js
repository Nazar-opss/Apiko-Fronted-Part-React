import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

const themeSlice = createSlice({
    name:'themes',
    initialState,
    reducers: {
        themeChanged(state, action) {
        
        }
    }
})
export const { themeChanged } = themeSlice.actions

export default themeSlice.reducer