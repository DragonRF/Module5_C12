import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
    'user/login',
    async (user) => {
        const response = await axios.post('http://localhost:3001/auth/login', user);
        return response.data;
    }
);

export const register = createAsyncThunk(
    'user/register',
    async (user) => {
        const response = await axios.post('http://localhost:3001/auth/register', user);
        return response.data;
    }
);
