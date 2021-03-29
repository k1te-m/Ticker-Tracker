import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
};

// Sets auth token from token stored locally and retrieves user info
export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (user, thunkAPI) => {
    setAuthToken(localStorage.token);

    const response = await axios.get("/api/auth/user");
    return response.data;
  }
);

// Registers user to the db and loads the user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, username, email, password }, thunkAPI) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      "/api/auth/register",
      { name, username, email, password },
      config
    );

    if (response.status !== 200) {
      return response.data;
    } else {
      loadUser();
      return response.data;
    }
  }
);

// Checks user email & password against db info, sets auth token, and returns user info
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      "/api/auth/login",
      { email, password },
      config
    );
    setAuthToken(response.data.token);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    [registerUser.rejected]: (state, action) => {
      state.error = "Error creating account.";
    },
    [loadUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loadUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    [loadUser.rejected]: (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
    },
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    [loginUser.rejected]: (state, action) => {
      state.error = "Invalid credentials.";
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

// Selectors
export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
