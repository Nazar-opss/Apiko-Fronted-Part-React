import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { useDispatch } from "react-redux";

const initialState = {
    fetches: [],
    isLoading: false,
    error: null,
}

// const fetchSlice = createSlice({
//     name:'fetch',
//     initialState,
//     reducers: {
//         setFetchList: (state, action) => {
//             state.fetches = action.payload
//         }
//     }
// })

export const fetchSearchList = createAsyncThunk (
    'fetch/fetchSearchList',
    async (keywords) => {
        console.log(keywords)
        const res = await axios(`https://demo-api.apiko.academy/api/products/search?keywords=${keywords}&offset=0&limit=20`,  
            { 
                headers: {
                    accept: "application/json"
                }
            },
        )
        const data = await res.data
        console.log(data)
        return data
    }
)

export const fetchSlice = createSlice({
    name:'fetch',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearchList.pending, (state) => {
            state.isLoading = true
            state.fetches = []
        })
        builder.addCase(fetchSearchList.fulfilled, (state, action) => {
            state.isLoading = false
            state.fetches = action.payload
            console.log(state.fetches)
        })
        builder.addCase(fetchSearchList.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    }
})


export const { setLoading } = fetchSlice.actions

export default fetchSlice.reducer