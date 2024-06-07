import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

import axios from "./../utils/customAxios.ts";
import toast from "react-hot-toast";
import { ProductType } from "../types/product.type.ts";
type InitialStateType = {
  list: ProductType[];
  length: number;
  isLoading: boolean;
  current: ProductType | null;
};

const initialState: InitialStateType = {
  list: [],
  length: 0,
  isLoading: true,
  current: null,
};

export const getProducts = createAsyncThunk(
  "Product/getProducts",
  async (_, thunkAPI) => {
    const response = await axios.get("/api/product", {
      signal: thunkAPI.signal,
    });
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "Product/deleteProduct",
  async (id: string, thunkAPI) => {
    const response = await axios.delete("/api/admin/product/" + id, {
      signal: thunkAPI.signal,
    });
    return response.data;
  }
);

const productSlice = createSlice({
  name: "PRODUCT",
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      const foundedIndex = state.list.findIndex(
        (item) => item._id === action.payload
      );
      if (foundedIndex !== -1)
        state.current = current(state.list[foundedIndex]);
    },
    unSetCurrent: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.list = action?.payload?.filterProduct ?? [];
      state.length = action?.payload?.length ?? 0;
      state.isLoading = false;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.length = initialState.length;
      state.list = initialState.list;
      toast.error("Có lỗi! Vui lòng thử lại sau!");
    });
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      const currentBanner = current(state.current);
      if (currentBanner) {
        const foundedIndex = state.list.findIndex(
          (item) => item._id === currentBanner._id
        );
        if (foundedIndex !== -1) {
          state.list.splice(foundedIndex, 1);
          toast.success("Xoá thành công!");
        }
        state.length = state.length - 1;
        state.current = null;
      }
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      toast.error("Có lỗi! Vui lòng thử lại sau!");
      state.current = null;
    });
  },
});

export const { setCurrent, unSetCurrent } = productSlice.actions;

export default productSlice.reducer;
