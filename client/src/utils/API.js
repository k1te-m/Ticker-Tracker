import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
// eslint-disable-next-line
export default {
  searchTicker: (ticker) => {
    delete axios.defaults.headers.common["x-auth-token"];

    return axios.get("/api/ticker/query/" + ticker);
  },
  getFollowedInfo: (tickers) => {
    delete axios.defaults.headers.common["x-auth-token"];

    return axios.get("/api/ticker/batchquery/" + tickers);
  },
  watchStock: async (id, symbol) => {
    setAuthToken(localStorage.token);
    return await axios.put("/api/ticker/follow/" + id, symbol);
  },
  unwatchStock: async (id, symbol) => {
    setAuthToken(localStorage.token);
    return await axios.put("/api/ticker/unfollow/" + id, symbol);
  },
  getSymbols: async (id) => {
    setAuthToken(localStorage.token);
    return await axios.get("/api/ticker/symbols/" + id);
  },
};
