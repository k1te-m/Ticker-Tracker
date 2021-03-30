import axios from "axios";

export default {
  searchTicker: (ticker) => {
    delete axios.defaults.headers.common["x-auth-token"];

    return axios.get("/api/ticker/query/" + ticker);
  },
};
