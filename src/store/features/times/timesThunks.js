import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../utils/constants";
import { notifyError, notifySucess } from "../../../utils/helper";
export const getStaffTimes = createAsyncThunk(
  "times/getStaffTimes",
  async (id, thunkAPI) => {
    // console.log(id, "idddddddddddd");
    try {
      const response = await axios.get(
        `${API_URL}/AvailableTime/GetStaffAllTime?Id=${id}`
      );
      return response.data.result;
    } catch (error) {
      console.log(error);
      notifyError("Error while fetching times");
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllTimes = createAsyncThunk(
  "times/getAllTimes",
  async (id, thunkAPI) => {
    // console.log(id, "idddddddddddd");
    try {
      const response = await axios.get(`${API_URL}/AvailableTime/GetAllTime`);
      return response.data.result;
    } catch (error) {
      console.log(error);
      notifyError("Error while fetching times");
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addTimeThunk = createAsyncThunk(
  "times/addTime",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/AvailableTime/AddTime`,
        data
      );

      notifySucess(response.data.message);
      thunkAPI.dispatch(getStaffTimes(data.staffId));
      return response.data.result;
    } catch (error) {
      console.log(error);
      notifyError(error.response.data.message);
      // return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteTimeThunk = createAsyncThunk(
  "times/deleteTime",
  async (timeId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${API_URL}/AvailableTime/DeleteTime?timeid=${timeId}`
      );

      notifySucess(response.data.message);
      return response.data.result;
    } catch (error) {
      console.log(error);
      notifyError(error.response.data.message);
      // return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateTimeThunk = createAsyncThunk(
  "times/updateTime",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}/AvailableTime/UpdateTime`,
        data
      );

      notifySucess(response.data.message);
      return response.data.result;
    } catch (error) {
      console.log(error);
      notifyError(error.response.data.message);
      // return thunkAPI.rejectWithValue(error);
    }
  }
);
