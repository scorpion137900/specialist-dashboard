import { createSlice } from "@reduxjs/toolkit";
import {
  getAvailableTimes,
  createReportVideoChat,
  updateAvailableTimes,
} from "./AvailableTimesThunks";

const initialState = {
  availableTimes: [],
  isLoading: false,
};

const AvailableTimesSlice = createSlice({
  name: "availableTimes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAvailableTimes.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAvailableTimes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.availableTimes = action.payload;
    });
    builder.addCase(getAvailableTimes.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(updateAvailableTimes.fulfilled, (state, action) => {
      state.availableTimes = state.availableTimes.map((time) =>
        time.timeId === action.meta.arg.timeId
          ? { ...time, status: action.meta.arg.status }
          : time
      );
    });
    builder.addCase(createReportVideoChat.fulfilled, (state, action) => {
      state.isLoading = false;
      state.availableTimes = state.availableTimes.map((time) =>
        time.timeId === action.meta.arg.timeId
          ? { ...time, status: "Reserved" }
          : time
      );
    });
  },
});

export const {} = AvailableTimesSlice.actions;

export default AvailableTimesSlice.reducer;
