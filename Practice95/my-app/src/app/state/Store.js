import { configureStore } from '@reduxjs/toolkit'
import authReducer  from './slice/AuthSlice'
import userReducer  from './slice/UserSlice'
import modalReducer  from './slice/ModalSlice'
import fetchReducer  from './slice/FetchSlice'
import cartReducer  from './slice/CartSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        modal: modalReducer,
        fetch: fetchReducer,
        cart: cartReducer,
    },
})
