import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../../../utils/API";

const initialState = {
  isLoading: false,
  currentTicker: null,
  error: null,
};

export const setSearch = createAsyncThunk(
  "search/setSearch",
  async (query, thunkAPI) => {
    const response = await API.searchTicker(query);

    return response.data;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: {
    [setSearch.pending]: (state) => {
      state.isLoading = true;
    },
    [setSearch.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentTicker = action.payload;
    },
    [setSearch.rejected]: (state) => {
      state.isLoading = false;
      state.error = "Error fetching results.";
    },
  },
});

// Selectors
export const selectSearch = (state) => state.search;

export default searchSlice.reducer;
