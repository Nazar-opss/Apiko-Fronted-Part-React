import apiUser from "@/app/apiUser";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    favorites: [],
}

export const addFavorite = createAsyncThunk(
    'user/addFavorite',
    async (id) => {
        const response = await apiUser.post(`/api/products/${id}/favorite`)
        .catch(error => {
            alert('already in favorite');
        })
        const data = await response.data
        console.log(data)
    }
)

export const getFavorite = createAsyncThunk(
    'user/getFavorite',
    async () => {
        const response = await apiUser.get('/api/products/favorites?offset=0&limit=100')
            .catch(error => {
            console.error('Error in request:', error);
            })
            const data = await response.data
            console.log(data)
            return data
    } 
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addFavorite.pending, (state, action) => {
            console.log(state, action)
        })
        builder.addCase(addFavorite.fulfilled, (state, action) => {
            console.log(state, action)
        })
        builder.addCase(addFavorite.rejected, (state, action) => {
            console.log(state, action)
        })
        builder.addCase(getFavorite.pending, (state, action) => {
            console.log(state, action)
        })
        builder.addCase(getFavorite.fulfilled, (state, action) => {
            console.log(state, action)
            state.favorites = action.payload
        })
        builder.addCase(getFavorite.rejected, (state, action) => {
            console.log(state, action)
        })
    }
})

export default userSlice.reducer