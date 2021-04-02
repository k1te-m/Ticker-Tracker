import axios from "axios";

export default {
  searchTicker: (ticker) => {
    delete axios.defaults.headers.common["x-auth-token"];

    return axios.get("/api/ticker/query/" + ticker);
  },
  watchStock: async (id, symbol) => {
    return await axios.put("/api/ticker/follow/" + id, symbol);
  },
  unwatchStock: async (id, symbol) => {
    return await axios.put("/api/ticker/unfollow/" + id, symbol);
  },
  getSymbols: async (id) => {
    return await axios.get("/api/ticker/symbols/" + id);
  },
};
