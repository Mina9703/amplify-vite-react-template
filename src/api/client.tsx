import axios, { AxiosInstance } from "axios";

const client: AxiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts",
});

export default client;
