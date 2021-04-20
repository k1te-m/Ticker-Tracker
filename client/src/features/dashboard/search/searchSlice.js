import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../../utils/API";

const initialState = {
  isLoading: false,
  landingTicker: null,
  currentTicker: null,
  error: null,
  userFollowedSymbols: null,
  userFollowedData: null,
};

// API GET request to retrieve specific ticker data from IEX Cloud
export const setSearch = createAsyncThunk(
  "search/setSearch",
  async (query, thunkAPI) => {
    const response = await API.searchTicker(query);
    return response.data;
  }
);

export const setLandingSearch = createAsyncThunk(
  "search/setLandingSearch",
  async (query, thunkAPI) => {
    const response = await API.searchTicker(query);
    return response.data;
  }
);

// API PUT request to add ticker to user's followed stocks in db
export const watchStock = createAsyncThunk(
  "search/watchStock",
  async ({ id, symbol }, thunkAPI) => {
    const response = await API.watchStock(id, { symbol: symbol });
    return response.data;
  }
);

// API PUT request to remove ticker from user's followed stocks in db
export const unwatchStock = createAsyncThunk(
  "search/unwatchStock",
  async ({ id, symbol }, thunkAPI) => {
    const response = await API.unwatchStock(id, { symbol: symbol });
    return response.data;
  }
);

// API GET request to retrieve all user followed tickers from the db
export const getFollowedSymbols = createAsyncThunk(
  "search/getFollowedSymbols",
  async (id, thunkAPI) => {
    const response = await API.getSymbols(id);

    return response.data;
  }
);

// API GET request to retrieve stock data from IEX Cloud for all user followed tickers
export const getFollowedData = createAsyncThunk(
  "search/getFollowedData",
  async (tickers, thunkAPI) => {
    const response = await API.getFollowedInfo(tickers);

    let arrayOfFollwedData = Object.keys(response.data).map((ticker) => {
      return response.data[ticker];
    });

    arrayOfFollwedData.sort((a, b) =>
      a.quote.companyName > b.quote.companyName ? 1 : -1
    );

    return arrayOfFollwedData;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // Clears currentTicker, returning user to home
    REMOVE_SEARCH: (state) => {
      return { ...state, currentTicker: null };
    },
    CLEAR_ERROR: (state) => {
      return { ...state, error: null };
    },
    CLEAR_SEARCH: (state) => {
      return initialState;
    },
    // Sorts userFollowedData by largest positive % change
    SORT_GAINERS: (state) => {
      state.userFollowedData.sort((a, b) =>
        a.quote.changePercent < b.quote.changePercent ? 1 : -1
      );
    },
    // Sort userFollowedData by largest negative % change
    SORT_LOSERS: (state) => {
      state.userFollowedData.sort((a, b) =>
        a.quote.changePercent > b.quote.changePercent ? 1 : -1
      );
    },
    // Sorts userFollowedData alphabetically
    SORT_ALPHA: (state) => {
      state.userFollowedData.sort((a, b) =>
        a.quote.companyName > b.quote.companyName ? 1 : -1
      );
    },
    SORT_ALPHA_REVERSE: (state) => {
      state.userFollowedData.sort((a, b) =>
        a.quote.companyName < b.quote.companyName ? 1 : -1
      );
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
    [setLandingSearch.pending]: (state) => {
      state.isLoading = true;
    },
    [setLandingSearch.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.landingTicker = action.payload;
    },
    [setLandingSearch.rejected]: (state) => {
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
      state.error = "Error fetching batch data.";
    },
  },
});

// Actions
export const {
  REMOVE_SEARCH,
  SORT_GAINERS,
  SORT_ALPHA,
  SORT_ALPHA_REVERSE,
  SORT_LOSERS,
  CLEAR_ERROR,
  CLEAR_SEARCH,
} = searchSlice.actions;

// Selectors
export const selectSearch = (state) => state.search;

export default searchSlice.reducer;
