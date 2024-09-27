import { createSlice } from "@reduxjs/toolkit";
import { createRecommendPlantFromFarmerAction, getAllRecommendPlantAction } from "../actions/recommendPlantAction";

const initialState = {
    recommendPlants: [],
    recommendPlant: {},
    isCreated: false,
    isLoading: false,
    error: null,
};

export const recommendPlantSlice = createSlice({
  name: "recommendPlant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // -------------------get All RecommendPlant Action-------------------
    builder.addCase(getAllRecommendPlantAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllRecommendPlantAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.recommendPlants = action.payload;
    });
    builder.addCase(getAllRecommendPlantAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });
    
    // -------------------create RecommendPlant From Farmer Action-------------------
    builder.addCase(createRecommendPlantFromFarmerAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createRecommendPlantFromFarmerAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isCreated = action.payload;
    });
    builder.addCase(createRecommendPlantFromFarmerAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });

    
  },
});

export default recommendPlantSlice.reducer;
