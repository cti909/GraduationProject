import { createSlice } from "@reduxjs/toolkit";
import { cancelSubscribeAction, createSubscribeAction, getAllSubscribesByUserAction, getSubscribesByIdAction, updateSubscribePlantAction } from "../actions/subscribeAction";

const initialState = {
  subscribes: [],
  subscribe: {},
  isCreated: false,
  isLoading: false,
  error: null,
};

export const subscribeSlice = createSlice({
  name: "subscribe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    // -------------------get All Subscribes By User Action-------------------
    builder.addCase(getAllSubscribesByUserAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllSubscribesByUserAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.subscribes = action.payload;
    });
    builder.addCase(getAllSubscribesByUserAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });

    // -------------------get Subscribes By Id Action-------------------
    builder.addCase(getSubscribesByIdAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSubscribesByIdAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.subscribe = action.payload;
    });
    builder.addCase(getSubscribesByIdAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });

    // -------------------create Subscribe Action-------------------
    builder.addCase(createSubscribeAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createSubscribeAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isCreated = action.payload;
    });
    builder.addCase(createSubscribeAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });

     // -------------------update Subscribe Plant Action-------------------
     builder.addCase(updateSubscribePlantAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateSubscribePlantAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isCreated = action.payload;
    });
    builder.addCase(updateSubscribePlantAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });

    // -------------------cancel Subscribe Action-------------------
    builder.addCase(cancelSubscribeAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(cancelSubscribeAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isCreated = action.payload;
    });
    builder.addCase(cancelSubscribeAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });
    
  },
});

export default subscribeSlice.reducer;
