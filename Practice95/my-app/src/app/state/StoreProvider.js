'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { store } from './AuthStore'

export default function StoreProvider({children}) {
    return <Provider store={store}>{children}</Provider>
}