import { createSlice } from "@reduxjs/toolkit";
import { createTransactionAction, getAllTransactionByUserIdAction } from "../actions/transactionAction";

const initialState = {
    transactions: [],
    linkTransaction: "",
    isCreated: false,
    isLoading: false,
    error: null,
};

export const landManagementSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // -------------------get All Transaction By UserId Action-------------------
    builder.addCase(getAllTransactionByUserIdAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllTransactionByUserIdAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.transactions = action.payload;
    });
    builder.addCase(getAllTransactionByUserIdAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });
    
    // -------------------create Transaction Action-------------------
    builder.addCase(createTransactionAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTransactionAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.linkTransaction = action.payload;
    });
    builder.addCase(createTransactionAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });
    
  },
});

export default landManagementSlice.reducer;
