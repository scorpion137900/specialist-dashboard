import { createSlice } from "@reduxjs/toolkit";
import { getAllArticles } from "./articleThunk";

const initialState = {
  isLoading: false,
  articles: [],
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllArticles.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllArticles.fulfilled, (state, action) => {
      state.isLoading = false;
      state.articles = action.payload;
    });
    builder.addCase(getAllArticles.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {} = articlesSlice.actions;

export default articlesSlice.reducer;
