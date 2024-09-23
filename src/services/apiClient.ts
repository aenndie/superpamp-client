import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:5195",
  baseURL: "https://localhost:7277/",
  //baseURL: "https://jsonplaceholder.typicode.com",
  /*params: {
    key: "",
  },*/
});
