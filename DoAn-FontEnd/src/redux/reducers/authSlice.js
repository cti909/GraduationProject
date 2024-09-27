import { createSlice } from "@reduxjs/toolkit";
import {
  loginAction,
  logoutAction,
  registerAction,
  setUserAction,
} from "../actions/authAction";

const initialState = {
  user: {},
  isLogin: false,
  isRegister: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // -------------------login-------------------
    builder.addCase(loginAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isLogin = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("userId", action.payload.user.id);
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });

    // -------------------logout-------------------
    builder.addCase(logoutAction.fulfilled, (state) => {
      console.log("logout");
      state.isLogin = false;
      state.user = {};
      state.isLoading = false;
      state.error = null;
    });

    // -------------------register-------------------
    builder.addCase(registerAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.data;
      state.isRegister = true;
      state.isLogin = true;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error);
      state.error = action.error.message;
    });
    
    // -------------------setUser-------------------
    builder.addCase(setUserAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(setUserAction.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.isLoading = false;
      state.user = action.payload;
      state.isRegister = false;
      state.isLogin = true;
      localStorage.setItem("userId", action.payload.id);
    });
    builder.addCase(setUserAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.error);
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
