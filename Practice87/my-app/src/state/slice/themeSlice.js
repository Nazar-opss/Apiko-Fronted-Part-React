import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";

const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers: {
        themeChanged(state) {
            // state.themes === state.themes.dark ? state.themes.light : state.themes.dark
            // state.theme = state.theme === state.theme.dark ? state.theme.light : state.theme.dark
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        }
    }
})
export const { themeChanged } = themeSlice.actions

export default themeSlice.reducer