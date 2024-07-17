import { ApiService } from "../services/api.services";
import { LoginResponseType } from "../types/user.types";

export type LoginCredentials = {
  email: string;
  password: string;
};

export const loginApiCall = async (
  credentials: LoginCredentials
): Promise<LoginResponseType> => {
  const response = await ApiService.post("/login", credentials);

  return response.data;
};
