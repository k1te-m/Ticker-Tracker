import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import alertReducer from "../features/alert/alertSlice";
import searchReducer from "../features/dashboard/search/searchSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    search: searchReducer,
  },
});
