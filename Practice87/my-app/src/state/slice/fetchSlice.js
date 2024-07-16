import { createSlice } from "@reduxjs/toolkit";

const initialState = {fetchList: []}

const fetchSlice = createSlice({
    name:'fetch',
    initialState,
    reducers: {
        setFetchList: (state, action) => {
            state.fetchList = action.payload
        }
    }
})
export const { setFetchList } = fetchSlice.actions

export default fetchSlice.reducer