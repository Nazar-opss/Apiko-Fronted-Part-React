import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

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

export const fetchContent = createAsyncThunk (
    'content/fetchContent',
    async () => {
        const res = await axios(`https://api.themoviedb.org/3/account/Invuukeeee/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`,  
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
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchContent.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchContent.fulfilled, (state, action) => {
            state.isLoading = false
            state.fetches = action.payload
        })
        builder.addCase(fetchContent.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error.message
        })
    }
})


export const { setFetchList } = fetchSlice.actions

export default fetchSlice.reducer