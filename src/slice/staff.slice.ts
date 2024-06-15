import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "./../utils/customAxios.ts";
import toast from "react-hot-toast";
import { UserType } from "../types/user.type.ts";
type InitialStateType = {
  list: UserType[];
  length: number;
  isLoading: boolean;
  current: UserType | null;
};

const initialState: InitialStateType = {
  list: [],
  length: 0,
  isLoading: true,
  current: null,
};

export const getStaffList = createAsyncThunk(
  "Staff/getStaffList",
  async (_, thunkAPI) => {
    const response = await axios.get("/api/admin/staff", {
      signal: thunkAPI.signal,
    });
    return response.data;
  }
);

export const deleteStaff = createAsyncThunk(
  "Staff/deleteStaff",
  async (id: string, thunkAPI) => {
    const response = await axios.delete("/api/admin/staff/" + id, {
      signal: thunkAPI.signal,
    });
    return response.data;
  }
);

const staffSlice = createSlice({
  name: "STAFF",
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
    builder.addCase(getStaffList.fulfilled, (state, action) => {
      state.list = action?.payload?.staffList ?? [];
      state.length = action?.payload?.length ?? 0;
      state.isLoading = false;
    });
    builder.addCase(getStaffList.rejected, (state) => {
      state.length = initialState.length;
      state.list = initialState.list;
      toast.error("Có lỗi! Vui lòng thử lại sau!");
    });
    builder.addCase(getStaffList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteStaff.fulfilled, (state) => {
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
    builder.addCase(deleteStaff.rejected, (state) => {
      toast.error("Có lỗi! Vui lòng thử lại sau!");
      state.current = null;
    });
  },
});

export const { setCurrent, unSetCurrent } = staffSlice.actions;

export default staffSlice.reducer;
