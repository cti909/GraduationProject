import { createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN, LOGOUT, REGISTER, SET_USER } from "./type.js";
import authApi from "../../services/auth.service.js";


export const loginAction = createAsyncThunk(
  LOGIN,
  async ({ email, password }) => {
    try {
      const response = await authApi.login(email, password);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);

export const logoutAction = createAsyncThunk(LOGOUT, () => {
  const response = localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
  return response;
});

export const registerAction = createAsyncThunk(
  REGISTER,
  async (queryParams) => {
    try {
      const response = await authApi.register(queryParams);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);
export const setUserAction = createAsyncThunk(SET_USER, async () => {
  const response = await authApi.setUser();
  return response.data;
});
