import { createSlice } from "@reduxjs/toolkit";
import { getLandManagementLogDetailBySubscribeAction, updateLandManagementLogAction } from "../actions/landManagementLogAction";

const initialState = {
    landManagementLogs: [],
    landManagementLog: {},
    isCreated: false,
    isLoading: false,
    error: null,
};

export const landManagementLogSlice = createSlice({
  name: "landManagementLog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    // -------------------get LandManagementLog Detail By Subscribe Action-------------------
    builder.addCase(getLandManagementLogDetailBySubscribeAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLandManagementLogDetailBySubscribeAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.landManagementLogs = action.payload;
    });
    builder.addCase(getLandManagementLogDetailBySubscribeAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });

    // -------------------update LandManagementLog Action-------------------
    builder.addCase(updateLandManagementLogAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateLandManagementLogAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isCreated = action.payload;
    });
    builder.addCase(updateLandManagementLogAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });
    
  },
});

export default landManagementLogSlice.reducer;
