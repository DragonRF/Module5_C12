//store.js
import {configureStore} from "@reduxjs/toolkit";
import studentReducer from "./students/studentSlice";

export const store = configureStore({
    reducer: {
        students: studentReducer
    }
});