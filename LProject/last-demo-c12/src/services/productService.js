// productService.js
import { createAsyncThunk } from "@reduxjs/toolkit";
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