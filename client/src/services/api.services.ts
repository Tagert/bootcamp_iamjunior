import axios, { AxiosError } from "axios";
import { axiosConfig } from "../config/axios.config";
import { useAuthStore } from "../store/auth";

export const ApiService = axios.create(axiosConfig);

ApiService.interceptors.request.use(
  async (config) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
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

ApiService.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response.status === 401) {
      const { logout } = useAuthStore.getState();
      logout();

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
