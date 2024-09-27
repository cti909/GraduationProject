import { createAsyncThunk } from "@reduxjs/toolkit";
import { CREATE_PLANT_DISEASE, GET_ALL_PLANT_DISEASE } from "./type.js";
import plantDiseaseApi from "../../services/plantDisease.service.js";


export const createPlantDiseaseAction = createAsyncThunk(
  CREATE_PLANT_DISEASE,
  async ({ userId, photo }) => {
    try {
      const response = await plantDiseaseApi.createPlantDisease(userId, photo);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);

export const getAllPlantDiseaseAction = createAsyncThunk(
  GET_ALL_PLANT_DISEASE,
  async (queryParams) => {
    try {
      // console.log(userId)
      const response = await plantDiseaseApi.getAllPlantDisease(queryParams);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);