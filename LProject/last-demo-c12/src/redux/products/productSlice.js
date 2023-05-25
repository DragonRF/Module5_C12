import { createSlice } from "@reduxjs/toolkit";
import { createProduct, fetchProducts, updateProduct, deleteProduct, fetchProductById } from "../../services/productService";

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
            state.list = state.list.filter(product => product.id !== action.payload);
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.list = state.list.map(product => product.id === action.payload.id ? action.payload : product);
        });
    }
});

export default productSlice.reducer;
