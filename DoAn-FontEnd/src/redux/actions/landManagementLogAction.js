import { createAsyncThunk } from "@reduxjs/toolkit";
import landManagementLogApi from "../../services/landManagementLog.service";
import { GET_LANDMANAGEMENTLOG_DETAIL_BY_SUBSCRIBE, UPDATE_LANDMANAGEMENTLOG } from "./type";


export const getLandManagementLogDetailBySubscribeAction = createAsyncThunk(
  GET_LANDMANAGEMENTLOG_DETAIL_BY_SUBSCRIBE,
  async (queryParams) => {
    try {
      const response = await landManagementLogApi.getLandManagementLogDetailBySubscribe(queryParams);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);

export const updateLandManagementLogAction = createAsyncThunk(
  UPDATE_LANDMANAGEMENTLOG,
  async (queryParams) => {
    try {
      const response = await landManagementLogApi.updateLandManagementLog(queryParams);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);