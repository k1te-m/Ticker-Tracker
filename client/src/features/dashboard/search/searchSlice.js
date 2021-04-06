import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../utils/API";

const initialState = {
  isLoading: false,
  currentTicker: null,
  error: null,
  userFollowedSymbols: null,
  userFollowedData: null,
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

export const unwatchStock = createAsyncThunk(
  "search/unwatchStock",
  async ({ id, symbol }, thunkAPI) => {
    const response = await API.unwatchStock(id, { symbol: symbol });
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

export const getFollowedData = createAsyncThunk(
  "search/getFollowedData",
  async (tickers, thunkAPI) => {
    const response = await API.getFollowedInfo(tickers);
    return response.data;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    REMOVE_SEARCH: (state) => {
      return { ...state, currentTicker: null };
    },
  },
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
    [watchStock.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userFollowedSymbols = action.payload;
    },
    [watchStock.rejected]: (state) => {
      state.isLoading = false;
      state.error = "Error watching stock.";
    },
    [unwatchStock.pending]: (state) => {
      state.isLoading = true;
    },
    [unwatchStock.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userFollowedSymbols = action.payload;
    },
    [unwatchStock.rejected]: (state) => {
      state.isLoading = false;
      state.error = "Error unwatching stock.";
    },
    [getFollowedData.pending]: (state) => {
      state.isLoading = true;
    },
    [getFollowedData.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userFollowedData = action.payload;
    },
    [getFollowedData.rejected]: (state) => {
      state.isLoading = false;
      state.error = "Error fetching data.";
    },
  },
});

export const { REMOVE_SEARCH } = searchSlice.actions;

// Selectors
export const selectSearch = (state) => state.search;

export default searchSlice.reducer;
