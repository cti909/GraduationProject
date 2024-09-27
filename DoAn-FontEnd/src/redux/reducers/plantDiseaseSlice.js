import { createSlice } from "@reduxjs/toolkit";
import { createPlantDiseaseAction, getAllPlantDiseaseAction } from "../actions/plantDiseaseAction";


const initialState = {
  plantDiseases: [],
  predictMessage: "",
  isLoading: false,
  error: null,
};

export const plantSlice = createSlice({
  name: "plantDisease",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // -------------------create Plant Disease Action-------------------
    builder.addCase(createPlantDiseaseAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createPlantDiseaseAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.predictMessage = action.payload.predictMessage;
    });
    builder.addCase(createPlantDiseaseAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action);
      state.error = action.error.message;
    });

    // -------------------get All Plant Disease Action-------------------
    builder.addCase(getAllPlantDiseaseAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPlantDiseaseAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.plantDiseases = action.payload;
    });
    builder.addCase(getAllPlantDiseaseAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action);
      state.error = action.error.message;
    });
    
  },
});

export default plantSlice.reducer;
