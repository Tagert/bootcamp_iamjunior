import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import { axiosConfig } from "../config/axios.config";

export const ApiService = axios.create(axiosConfig);

ApiService.interceptors.request.use(
  async (config) => {
    try {
      const token = Cookies.get("AccessToken");

      if (token) {
        const parsedToken = JSON.parse(token);
        config.headers.Authorization = `Bearer ${parsedToken}`;
      }
    } catch (error) {
      console.error("Error parsing token:", error);
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
