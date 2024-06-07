import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { BannerType } from "../types/banner.type";
import axios from "./../utils/customAxios.ts";
import toast from "react-hot-toast";
type InitialStateType = {
  list: BannerType[];
  length: number;
  isLoading: boolean;
  current: BannerType | null;
};

const initialState: InitialStateType = {
  list: [],
  length: 0,
  isLoading: true,
  current: null,
};

export const getBanners = createAsyncThunk(
  "Banner/getBanners",
  async (_, thunkAPI) => {
    const response = await axios.get("/api/banner", {
      signal: thunkAPI.signal,
    });
    return response.data;
  }
);
export const deleteBanner = createAsyncThunk(
  "Banner/deleteBanner",
  async (id: string, thunkAPI) => {
    const response = await axios.delete("/api/admin/banner/" + id, {
      signal: thunkAPI.signal,
    });
    return response.data;
  }
);

const bannerSlice = createSlice({
  name: "BANNER",
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
    builder.addCase(getBanners.fulfilled, (state, action) => {
      state.list = action?.payload?.banner ?? [];
      state.length = action?.payload?.length ?? 0;
      state.isLoading = false;
    });
    builder.addCase(getBanners.rejected, (state) => {
      state.length = initialState.length;
      state.list = initialState.list;
      toast.error("Có lỗi! Vui lòng thử lại sau!");
    });
    builder.addCase(getBanners.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBanner.fulfilled, (state) => {
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
    builder.addCase(deleteBanner.rejected, (state) => {
      toast.error("Có lỗi! Vui lòng thử lại sau!");
      state.current = null;
    });
  },
});

export const { setCurrent, unSetCurrent } = bannerSlice.actions;

export default bannerSlice.reducer;
