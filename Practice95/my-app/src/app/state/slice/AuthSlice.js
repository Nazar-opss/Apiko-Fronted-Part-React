import apiLogin from '@/app/apiLogin';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { useSelector } from 'react-redux'

const initialState = {
  accessToken: '',
  isLoggedIn: false,
}

export const login = createAsyncThunk(
    'auth/login',
    // async (authCheck) => {
    //     console.log(authCheck)
    //     const response = await axios.get('https://demo-api.apiko.academy/api/account', {
    //         headers: {
    //             Authorization: `Bearer ${authCheck}`}
    //       })
    //       console.log(response.data)
    // }
    
    // async (_, { rejectWithValue }) => {
    //     try {
    //       const response = await apiLogin.get('/api/account');
    //       return response.data;
    //     } catch (error) {
    //       return rejectWithValue(error.response?.data || 'Unknown error');
    //     }
    //   }
    async () => {
        apiLogin.get('/api/account')
          .then(response => {
            console.log(response.data);
          }) 
          .catch(error => {
            // Handle errors
            console.error('Error in request:', error);
          })
          console.log(response)
    }
)

export const authSlice =  createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            // if (state.accessToken != '') {
            //     state.isLoggedIn = true
            // }
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(login.pending, (state) => {
    //         console.log(state)
    //     })
    //     builder.addCase(login.fulfilled, (state, action) => {
    //         console.log(state, action)
    //     })
    //     builder.addCase(login.rejected, (state) => {
    //         console.log(state)
    //     })
    // }
})

export const { setAccessToken, setIsLoggedIn } = authSlice.actions

export default authSlice.reducer