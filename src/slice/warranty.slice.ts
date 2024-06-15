import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "./../utils/customAxios.ts";
import toast from "react-hot-toast";
import { WarrantyType } from "../types/warranty.type.ts";
type InitialStateType = {
  list: WarrantyType[];
  length: number;
  isLoading: boolean;
  current: WarrantyType | null;
};

const initialState: InitialStateType = {
  list: [],
  length: 0,
  isLoading: true,
  current: null,
};

export const getWarranties = createAsyncThunk(
  "Warranty/getWarranties",
  async (_, thunkAPI) => {
    const response = await axios.get("/api/admin/warranty", {
      signal: thunkAPI.signal,
    });
    return response.data;
  }
);

const warrantySlice = createSlice({
  name: "WARRANTY",
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    unSetCurrent: (state) => {
      state.current = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWarranties.fulfilled, (state, action) => {
      state.list = action?.payload?.warrantyList ?? [];
      state.length = action?.payload?.length ?? 0;
      state.isLoading = false;
    });
    builder.addCase(getWarranties.rejected, (state) => {
      state.length = initialState.length;
      state.list = initialState.list;
      toast.error("Có lỗi! Vui lòng thử lại sau!");
    });
    builder.addCase(getWarranties.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { setCurrent, unSetCurrent } = warrantySlice.actions;

export default warrantySlice.reducer;
