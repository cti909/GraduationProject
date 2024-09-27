import { createSlice } from "@reduxjs/toolkit";
import { createLandAction, getAllLandsAction, getLandByIdAction } from "../actions/landAction";


const initialState = {
  lands: [],
  land: {},
  isCreated: false,
  isLoading: false,
  error: null,
};

export const plantSlice = createSlice({
  name: "land",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // -------------------get All Plant Disease Action-------------------
    builder.addCase(getAllLandsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllLandsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lands = action.payload;
    });
    builder.addCase(getAllLandsAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action);
      state.error = action.error.message;
    });

    // -------------------get Land By Id Action-------------------
    builder.addCase(getLandByIdAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLandByIdAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.land = action.payload;
    });
    builder.addCase(getLandByIdAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action);
      state.error = action.error.message;
    });

    // -------------------create Land Action-------------------
    builder.addCase(createLandAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createLandAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isCreated = action.payload;
    });
    builder.addCase(createLandAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action);
      state.error = action.error.message;
    });
    
  },
});

export default plantSlice.reducer;
