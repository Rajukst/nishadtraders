
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import apiSlice from "../allFeatures/apiSlice/apiSlice";
import authSlice from "../allFeatures/Auth/authSlice";


const store= configureStore({
    reducer:{
        [apiSlice.reducerPath]:apiSlice.reducer,
        auth: authSlice,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
})
export default store;