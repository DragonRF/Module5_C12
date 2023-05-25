// productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.get(`${API_BASE_URL}/products`);
        return response.data;
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (productId) => {
        const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
        return response.data;
    }
);

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (newProduct) => {
        await axios.post(`${API_BASE_URL}/products`, newProduct);
        return newProduct;
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (productId) => {
        await axios.delete(`${API_BASE_URL}/products/${productId}`);
        return productId;
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async (updatedProduct) => {
        const { id } = updatedProduct;
        const response = await axios.put(`${API_BASE_URL}/products/${id}`, updatedProduct);
        return response.data;
    }
);

const initialState = {
    list: [],
    item: null
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.list = action.payload;
        });
        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            state.item = action.payload;
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.list.push(action.payload);
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.list = state.list.filter((product) => product.id !== action.payload);
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.list = state.list.map((product) =>
                product.id === action.payload.id ? action.payload : product
            );
        });
    }
});

export default productSlice.reducer;
