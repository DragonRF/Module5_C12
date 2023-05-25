//store.js
import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./products/productSlice";
import userReducer from "./user/userSlice";

const store = configureStore({
    reducer: {
        products: productReducer,
        user: userReducer
    }
})

export default store;