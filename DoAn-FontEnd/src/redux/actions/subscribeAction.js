import { createAsyncThunk } from "@reduxjs/toolkit";
import { CANCEL_SUBSCRIBE, CREATE_SUBSCRIBE, GET_ALL_SUBSCRIBE_BY_USER, GET_SUBSCRIBE_BY_ID, UPDATE_SUBSCRIBE_PLANT } from "./type.js";
import subscribeApi from "../../services/subscribe.service.js";


export const getAllSubscribesByUserAction = createAsyncThunk(
  GET_ALL_SUBSCRIBE_BY_USER,
  async (queryParams) => {
    try {
      const response = await subscribeApi.getAllSubscribeByUser(queryParams);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);

export const getSubscribesByIdAction = createAsyncThunk(
  GET_SUBSCRIBE_BY_ID,
  async ({id: id}) => {
    try {
      const response = await subscribeApi.getSubscribeById(id);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);

export const createSubscribeAction = createAsyncThunk(
  CREATE_SUBSCRIBE,
  async ({ description, durationTime, totalPrice, userId, landManagementId }) => {
    try {
      const response = await subscribeApi.createSubscribe(description, durationTime, totalPrice, userId, landManagementId);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);

export const updateSubscribePlantAction = createAsyncThunk(
  UPDATE_SUBSCRIBE_PLANT,
  async (queryParams) => {
    try {
      const response = await subscribeApi.updateSubscribePlant(queryParams);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);

export const cancelSubscribeAction = createAsyncThunk(
  CANCEL_SUBSCRIBE,
  async (queryParams) => {
    try {
      const response = await subscribeApi.cancelSubscribe(queryParams);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);

