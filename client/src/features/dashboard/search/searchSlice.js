import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../utils/API";

const initialState = {
  isLoading: false,
  currentTicker: null,
  error: null,
  userFollowedSymbols: null,
};

export const setSearch = createAsyncThunk(
  "search/setSearch",
  async (query, thunkAPI) => {
    const response = await API.searchTicker(query);

    return response.data;
  }
);

export const watchStock = createAsyncThunk(
  "search/watchStock",
  async ({ id, symbol }, thunkAPI) => {
    const response = await API.watchStock(id, { symbol: symbol });
    return response.data;
  }
);

export const getFollowedSymbols = createAsyncThunk(
  "search/getFollowedSymbols",
  async (id, thunkAPI) => {
    const response = await API.getSymbols(id);

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
    [getFollowedSymbols.pending]: (state) => {
      state.isLoading = true;
    },
    [getFollowedSymbols.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userFollowedSymbols = action.payload;
    },
    [getFollowedSymbols.rejected]: (state) => {
      state.isLoading = false;
      state.error = "Error fetching user symbols.";
    },
    [watchStock.pending]: (state) => {
      state.isLoading = true;
    },
    [watchStock.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [watchStock.rejected]: (state) => {
      state.isLoading = false;
      state.error = "Error watching stock.";
    },
  },
});

// Selectors
export const selectSearch = (state) => state.search;

export default searchSlice.reducer;
