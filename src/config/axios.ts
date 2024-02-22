import axios from "axios";

export const AXIOS = axios.create({
  baseURL: "https://restaurant.delino.com",
  timeout: 20000
});
