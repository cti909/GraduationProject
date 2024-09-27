import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ALL_LANDMANAGEMENT_BY_ID, GET_ALL_LANDMANAGEMENT_BY_USER, UPDATE_LANDMANAGEMENT_FINISH_PLANT } from "./type.js";
import landManagementApi from "../../services/landManagement.service.js";


export const getAllLandManagementsByUserAction = createAsyncThunk(
  GET_ALL_LANDMANAGEMENT_BY_USER,
  async (queryParams) => {
    try {
      const response = await landManagementApi.getAllLandManagementByUser(queryParams);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);

export const getAllLandManagementsByIdAction = createAsyncThunk(
  GET_ALL_LANDMANAGEMENT_BY_ID,
  async (queryParams) => {
    try {
      const response = await landManagementApi.getLandManagementById(queryParams.id);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);

export const updateLandManagementsFinishPlantAction = createAsyncThunk(
  UPDATE_LANDMANAGEMENT_FINISH_PLANT,
  async (queryParams) => {
    try {
      const response = await landManagementApi.updateLandManagementsFinishPlant(queryParams);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);