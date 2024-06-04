import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "./../utils/customAxios.ts";
import { UserType } from "../types/user.type.ts";

const isAuth =
  localStorage !== null ? JSON.parse(localStorage.getItem("user")!) : false;

type UserState = {
  info: UserType;
  isAuthenticated: boolean;
};

const initialState: UserState = {
  info: { _id: "", name: "", staffCode: "", role: "" },
  isAuthenticated: isAuth,
};

export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  const response = await axios.get("/api/admin/auth/getme", {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
    signal: thunkAPI.signal,
  });
  return response.data;
});

const userSlice = createSlice({
  name: "USER",
  initialState,
  reducers: {
    logOut: (state) => {
      state.info = initialState.info;
      state.isAuthenticated = false;
      localStorage.setItem("user", JSON.stringify(state.isAuthenticated));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.fulfilled, (state, action) => {
      // Add user to the state
      state.info._id = action?.payload?.user?._id ?? "";
      state.info.name = action?.payload?.user?.name ?? "";
      state.info.staffCode = action?.payload?.user?.staffCode ?? "";
      state.info.role = action?.payload?.user?.role ?? "";
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(state.isAuthenticated));
    });
    builder.addCase(getMe.rejected, (state) => {
      state.info = initialState.info;
      state.isAuthenticated = false;
      localStorage.setItem("user", JSON.stringify(state.isAuthenticated));
    });
  },
});

export const { logOut } = userSlice.actions;

export default userSlice.reducer;
