import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

import axios from "./../utils/customAxios.ts";
import toast from "react-hot-toast";
import { PromotionType } from "../types/promotion.type.ts";
type InitialStateType = {
  list: PromotionType[];
  length: number;
  isLoading: boolean;
  current: PromotionType | null;
};

const initialState: InitialStateType = {
  list: [],
  length: 0,
  isLoading: true,
  current: null,
};

export const getPromotions = createAsyncThunk(
  "Promotion/getPromotions",
  async (_, thunkAPI) => {
    const response = await axios.get("/api/promotion", {
      signal: thunkAPI.signal,
    });
    return response.data;
  }
);

export const deletePromotion = createAsyncThunk(
  "Promotion/deletePromotion",
  async (id: string, thunkAPI) => {
    const response = await axios.delete("/api/admin/promotion/" + id, {
      signal: thunkAPI.signal,
    });
    return response.data;
  }
);

const promotionSlice = createSlice({
  name: "PROMOTION",
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
    builder.addCase(getPromotions.fulfilled, (state, action) => {
      state.list = action?.payload?.promotionPolicys ?? [];
      state.length = action?.payload?.length ?? 0;
      state.isLoading = false;
    });
    builder.addCase(getPromotions.rejected, (state) => {
      state.length = initialState.length;
      state.list = initialState.list;
      toast.error("Có lỗi! Vui lòng thử lại sau!");
    });
    builder.addCase(getPromotions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deletePromotion.fulfilled, (state) => {
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
    builder.addCase(deletePromotion.rejected, (state) => {
      toast.error("Có lỗi! Vui lòng thử lại sau!");
      state.current = null;
    });
  },
});

export const { setCurrent, unSetCurrent } = promotionSlice.actions;

export default promotionSlice.reducer;
