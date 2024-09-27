import { createAsyncThunk } from "@reduxjs/toolkit";
import { CREATE_RECOMMEND_PLANT_FROM_FARMER, GET_ALL_RECOMMEND_PLANT_FROM_FARMER } from "./type";
import recommendPlantApi from "../../services/recommendPlant.service";


export const getAllRecommendPlantAction = createAsyncThunk(
    GET_ALL_RECOMMEND_PLANT_FROM_FARMER,
  async (queryParams) => {
    try {
      const response = await recommendPlantApi.getAllRecommendPlant(queryParams);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);

export const createRecommendPlantFromFarmerAction = createAsyncThunk(
    CREATE_RECOMMEND_PLANT_FROM_FARMER,
  async (queryParams) => {
    try {
      const response = await recommendPlantApi.createRecommendPlantFromFarmer(queryParams);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);