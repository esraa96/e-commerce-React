// store/products/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commerce from "../../services/commerce";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (options = {}) => {
    // options can include { limit, page, category_slug, sort_by }
    const res = await commerce.products.list(options);
    // commerce returns { data: [...] }
    return res.data || [];
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loader: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loader = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loader = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.error = true;
        state.loader = false;
      });
  },
});

export default productsSlice.reducer;
