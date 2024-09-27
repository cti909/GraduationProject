import { createSlice } from "@reduxjs/toolkit";
import { getAllLandManagementsByIdAction, getAllLandManagementsByUserAction } from "../actions/landManagementAction";

const initialState = {
    landManagements: [],
    landManagement: {},
    isCreated: false,
    isLoading: false,
    error: null,
};

export const landManagementSlice = createSlice({
  name: "landManagement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
    // -------------------get All LandManagements By User Action-------------------
    builder.addCase(getAllLandManagementsByUserAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllLandManagementsByUserAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.landManagements = action.payload;
    });
    builder.addCase(getAllLandManagementsByUserAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });

    // -------------------get All LandManagement By Id Action-------------------
    builder.addCase(getAllLandManagementsByIdAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllLandManagementsByIdAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.landManagement = action.payload;
    });
    builder.addCase(getAllLandManagementsByIdAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });
    
  },
});

export default landManagementSlice.reducer;
