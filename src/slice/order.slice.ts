import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "./../utils/customAxios.ts";
import toast from "react-hot-toast";
import { OrderType } from "../types/order.type.ts";
type InitialStateType = {
  list: OrderType[];
  length: number;
  isLoading: boolean;
  current: OrderType[];
};

const initialState: InitialStateType = {
  list: [],
  length: 0,
  isLoading: true,
  current: [],
};

export const getOrders = createAsyncThunk(
  "Order/getOrders",
  async (_, thunkAPI) => {
    const response = await axios.get("/api/admin/order", {
      signal: thunkAPI.signal,
    });
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "ORDER",
  initialState,
  reducers: {
    setTabAction: (state, action) => {
      if (action.payload === 0) state.current = [];
      if (action.payload === 1)
        state.current = current(state.list).filter(
          (item) => item.status === "pending"
        );
      if (action.payload === 2)
        state.current = current(state.list).filter(
          (item) => item.status === "accepted"
        );
      if (action.payload === 3)
        state.current = current(state.list).filter(
          (item) => item.status === "shipping"
        );
      if (action.payload === 4)
        state.current = current(state.list).filter(
          (item) => item.status === "completed"
        );
      if (action.payload === 5)
        state.current = current(state.list).filter(
          (item) => item.status === "rejected"
        );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.list = action?.payload?.resOrders ?? [];
      state.current = [];
      state.length = action?.payload?.length ?? 0;
      state.isLoading = false;
    });
    builder.addCase(getOrders.rejected, (state) => {
      state.length = initialState.length;
      state.list = initialState.list;
      toast.error("Có lỗi! Vui lòng thử lại sau!");
    });
    builder.addCase(getOrders.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { setTabAction } = orderSlice.actions;

export default orderSlice.reducer;
