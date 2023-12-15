import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../utils/constants";
import { notifySucess } from "../../../utils/helper";

export const getAllArticles = createAsyncThunk(
  "articles/getAllArticles",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/Article/GetAllArticle`);
      console.log(response);
      return response.data.result;
    } catch (error) {
      console.log(error);
      notifyError("Error while fetching articles");
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const addArticle = createAsyncThunk(
  "articles/addArticle",
  async ({ title, content, specialtiesId, staffId }, thunkAPI) => {
    try {
      const res = await axios.post(`${API_URL}/Article/AddArticle`, {
        title: title,
        content: content,
        specialtiesId: specialtiesId,
        staffId: staffId,
      });
      console.log(res);
      notifySucess("added Successfuly");
      thunkAPI.dispatch(getAllArticles());
      return res.data;
    } catch (error) {
      console.log(error);
      notifyError("Error while adding article");
      return thunkAPI.rejectWithValue(error);
    }
  }
);
