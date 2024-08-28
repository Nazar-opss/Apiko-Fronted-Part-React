'use client'
import { configureStore } from '@reduxjs/toolkit'
import authSlice  from './slice/AuthSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
    },
    })
