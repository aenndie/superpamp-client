import axios from "axios";
import { BACKEND_URL, GATEWAY_API_URL } from "../radix/config";

const apiClient = axios.create({
  //baseURL: "http://localhost:5195",
  baseURL: BACKEND_URL,
  /*params: {
    key: "",
  },*/
});

export const gatewayClient = axios.create({
  baseURL: GATEWAY_API_URL,
});

export default apiClient;
