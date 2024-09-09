import { configureStore } from '@reduxjs/toolkit'
import authReducer  from './slice/AuthSlice'
import userReducer  from './slice/UserSlice'
import modalReducer  from './slice/ModalSlice'
import fetchReducer  from './slice/FetchSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        modal: modalReducer,
        fetch: fetchReducer,
    },
})
