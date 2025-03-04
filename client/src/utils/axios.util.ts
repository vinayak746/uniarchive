import axios, { AxiosInstance } from "axios";
import { SERVER_URL } from "./const.util";

const server: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

export default server;
