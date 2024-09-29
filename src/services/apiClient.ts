import axios from "axios";
import { GATEWAY_API_URL } from "../radix/config";

const apiClient = axios.create({
  //baseURL: "http://localhost:5195",
  baseURL: "https://localhost:7277/",
  //baseURL: "https://jsonplaceholder.typicode.com",
  /*params: {
    key: "",
  },*/
});

export const gatewayClient = axios.create({
  baseURL: GATEWAY_API_URL,
});

export default apiClient;
