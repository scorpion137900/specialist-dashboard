import { createSlice } from "@reduxjs/toolkit";
import { getAllTimes, getStaffTimes } from "./timesThunks";

const initialState = {
  times: [],
  isLoading: false,
  staffTimes: [],
};

const timesSlice = createSlice({
  name: "times",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTimes.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllTimes.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getAllTimes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.times = action.payload;
    });
    builder.addCase(getStaffTimes.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getStaffTimes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.staffTimes = action.payload;
    });
    builder.addCase(getStaffTimes.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const {} = timesSlice.actions;

export default timesSlice.reducer;
