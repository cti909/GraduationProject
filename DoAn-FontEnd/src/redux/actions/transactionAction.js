import { createAsyncThunk } from "@reduxjs/toolkit";
import { CREATE_TRANSACTION, GET_ALL_TRANSACTION_BY_USER } from "./type";
import transactionApi from "../../services/transaction.service";

export const getAllTransactionByUserIdAction = createAsyncThunk(
  GET_ALL_TRANSACTION_BY_USER,
  async (queryParams) => {
    try {
      const response = await transactionApi.getAllTransactionByUserId(queryParams);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);

export const createTransactionAction = createAsyncThunk(
  CREATE_TRANSACTION,
  async (queryParams) => {
    try {
      const response = await transactionApi.createTransaction(queryParams);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      return Promise.reject(error.response.data);
    }
  }
);