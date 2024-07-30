import { AxiosRequestConfig } from "axios";
import { PROD } from "../constants/environment";

const CONTENT_TYPE_JSON = "application/json";
const CORS_POLICY = "no-cors";
const ALLOW_ORIGIN = "*";

const BASE_URL = PROD
  ? "https://home-service-app-heroku-e3f44bc25426.herokuapp.com/"
  : import.meta.env.VITE_API_URL;

export const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": CONTENT_TYPE_JSON,
    cors: CORS_POLICY,
    "Access-Control-Allow-Origin": ALLOW_ORIGIN,
  },
};
