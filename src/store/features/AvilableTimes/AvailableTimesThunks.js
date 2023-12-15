import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../utils/constants";
import { onSessionCreate } from "../auth/authSlice";

export const getAvailableTimes = createAsyncThunk(
  "availableTimes/getAvailableTimes",
  async (_, thunkAPI) => {
    try {
      const response = await axios(`${API_URL}/AvailableTime/GetAllTime`);
      console.log(response);
      return response.data.result;
    } catch (error) {
      console.log(error);
    }
  }
);
export const updateAvailableTimes = createAsyncThunk(
  "availableTimes/updateAvailableTimes",
  async ({ timeId, status }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}/AvailableTime/UpdateAvailableTimeStatus?status=${status}&TimeId=${timeId}`
      );
      return response.data.result;
    } catch (error) {
      console.log(error);
    }
  }
);
//   const response = await axios.post(
//     `${API_URL}/ReportVideoChat/CreateReportVideoChat?patientId=${patientId}&availabletimeId=${time.timeId}`
//   );
export const createReportVideoChat = createAsyncThunk(
  "availableTimes/createReportSession",
  async ({ patientId, timeId }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/ReportVideoChat/CompleteReportVideoChat?patientId=${patientId}&availabletimeId=${timeId}`
      );
      console.log(response);
      // thunkAPI.dispatch(getAvailableTimes());
      thunkAPI.dispatch(onSessionCreate());
      return response.data.result;
    } catch (error) {
      console.log(error);
    }
  }
);
