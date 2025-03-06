import { SERVER_URL } from "./const.util";
import axios, { type AxiosInstance } from "axios";

const server: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

export default server;
