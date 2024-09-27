import { createSlice } from "@reduxjs/toolkit";
import { getAllProvinceAction } from "../actions/provinceAction";

const initialState = {
  provinces: [],
  isLoading: false,
  error: null,
};

export const provinceSlice = createSlice({
  name: "province",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // -------------------get All Province Action-------------------
    builder.addCase(getAllProvinceAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProvinceAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.provinces = action.payload;
    });
    builder.addCase(getAllProvinceAction.rejected, (state, action) => {
      state.isLoading = false;
      console.log("error in slice: ", action.error.message);
      state.error = action.error.message;
    });

  },
});

export default provinceSlice.reducer;
