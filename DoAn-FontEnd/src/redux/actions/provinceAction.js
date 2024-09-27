import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ALL_PROVINCE } from "./type.js";
import provinceApi from "../../services/province.service.js";


export const getAllProvinceAction = createAsyncThunk(
    GET_ALL_PROVINCE,
  async () => {
    try {
      const response = await provinceApi.getAllProvinces();
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);