import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_ALL_PERENNIAL_PLANTS, GET_ALL_PLANTS, GET_ALL_PLANTS_RECOMMEND, GET_PLANT } from "./type.js";
import plantApi from "../../services/plant.service.js";


export const getAllPlantsAction = createAsyncThunk(
  GET_ALL_PLANTS,
  async (queryParams) => {
    try {
      // console.log(queryParams)
      const response = await plantApi.getAllPlants(queryParams);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      // throw new Error(error.response.data.message);
      return Promise.reject(error.response.data);
    }
  }
);

export const getAllPerennialBasicPlantsAction = createAsyncThunk(
  GET_ALL_PERENNIAL_PLANTS,
  async () => {
    try {
      // console.log(queryParams)
      const response = await plantApi.getAllPerennialBasicPlants();
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      // throw new Error(error.response.data.message);
      return Promise.reject(error.response.data);
    }
  }
);

export const getPlantByIdAction = createAsyncThunk(
  GET_PLANT,
  async ({id}) => {
    try {
      const response = await plantApi.getPlantById(id);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);

export const getAllPlantsRecommendAction = createAsyncThunk(
  GET_ALL_PLANTS_RECOMMEND,
  async (queryParams) => {
    try {
      const response = await plantApi.getAllPlantsRecommend(queryParams);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);