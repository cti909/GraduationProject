import { createSlice } from "@reduxjs/toolkit";
import {
  getAllPerennialBasicPlantsAction,
    getAllPlantsAction,
    getAllPlantsRecommendAction,
    getPlantByIdAction,
  
} from "../actions/plantAction";

const initialState = {
  plants: [],
  plant: {},
  isLoading: false,
  error: null,
};

export const plantSlice = createSlice({
  name: "plant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // -------------------get all plants-------------------
    builder.addCase(getAllPlantsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPlantsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.plants = action.payload;
    });
    builder.addCase(getAllPlantsAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });

    // -------------------get All Perennial Basic Plants Action-------------------
    builder.addCase(getAllPerennialBasicPlantsAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPerennialBasicPlantsAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.plants = action.payload;
    });
    builder.addCase(getAllPerennialBasicPlantsAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });

    // -------------------get Land By Id Action-------------------
    builder.addCase(getPlantByIdAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getPlantByIdAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.plant = action.payload;
    });
    builder.addCase(getPlantByIdAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action);
      state.error = action.error.message;
    });

    // -------------------get All Plants Recommend Action-------------------
    builder.addCase(getAllPlantsRecommendAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPlantsRecommendAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.plants = action.payload;
    });
    builder.addCase(getAllPlantsRecommendAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action);
      state.error = action.error.message;
    });
  },
});

export default plantSlice.reducer;
