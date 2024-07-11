import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./slice/themeSlice";
import fetchSlice from "./slice/fetchSlice";

export const store = configureStore({
    reducer: {
        theme: themeSlice,
        fetchStore: fetchSlice,
    },
    preloadedState: {}
}
);
