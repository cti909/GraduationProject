import { createAsyncThunk } from "@reduxjs/toolkit";
import { CREATE_LAND, GET_ALL_LANDS, GET_LAND} from "./type.js";
import landApi from "../../services/land.service.js";


export const getAllLandsAction = createAsyncThunk(
  GET_ALL_LANDS,
  async (queryParams) => {
    try {
      const response = await landApi.getAllLands(queryParams);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);

export const getLandByIdAction = createAsyncThunk(
  GET_LAND,
  async ({id}) => {
    try {
      const response = await landApi.getLandById(id);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);

export const createLandAction = createAsyncThunk(
  CREATE_LAND,
  async ({photos, ...queryParams}) => {
    try {
      const response = await landApi.createLand({photos, ...queryParams});
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);