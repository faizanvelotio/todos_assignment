import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export default axiosConfig;
