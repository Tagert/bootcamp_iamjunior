import { AxiosRequestConfig } from "axios";

const CONTENT_TYPE_JSON = "application/json";
const CORS_POLICY = "no-cors";
const ALLOW_ORIGIN = "*";

const BASE_URL = import.meta.env.VITE_API_URL;

export const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": CONTENT_TYPE_JSON,
    cors: CORS_POLICY,
    "Access-Control-Allow-Origin": ALLOW_ORIGIN,
  },
};
