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

export const fetchMoviesList = createAsyncThunk (
    'content/fetchMoviesList',
    async (dataFetch) => {
        console.log(dataFetch)
        const{ pageFetch, fetchCategory } = dataFetch
        const res = await axios(`https://api.themoviedb.org/3/account/Invuukeeee/${fetchCategory}/movies?language=en-US&page=${pageFetch || 1}&sort_by=created_at.asc`,  
            { 
                headers: {
                    accept: "application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjU0NDAzOWUyZjcyNzE2MDQ1MjI0MTYyNTUzMjVhZiIsInN1YiI6IjY1MmQ1NTg4MDI0ZWM4MDEzYzU4ZWE2YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hWvRwpk_xlSh71byPoa1qFKZCmbgDyEUOxl3jrZ7puY",
                }
            },
        )
        const data = await res.data
        return data
    }
)

export const fetchSlice = createSlice({
    name:'fetch',
    initialState,
    reducers: {
        // setLoading: (state, action) => {
        //     state.isLoading = action.payload
        // } 
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMoviesList.pending, (state) => {
            state.isLoading = true
            state.fetches = []
        })
        builder.addCase(fetchMoviesList.fulfilled, (state, action) => {
            state.isLoading = false
            state.fetches = action.payload
        })
        builder.addCase(fetchMoviesList.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    }
})


export const { setLoading } = fetchSlice.actions

export default fetchSlice.reducer