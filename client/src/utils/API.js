import axios from "axios";
const baseURL = "https://cloud.iexapis.com/stable/stock/";
const searchQuery = "/batch?types=quote,news,chart&range=1m&last=10&token=";

let key = process.env.IEX_KEY;

export default {
  searchTicker: (ticker) => {
    delete axios.defaults.headers.common["x-auth-token"];

    return axios.get(baseURL + ticker + searchQuery + key);
  },
};
