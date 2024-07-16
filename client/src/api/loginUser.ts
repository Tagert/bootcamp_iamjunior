import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "../services/api.services";
import { UserType } from "../types/user.types";
import { LOGIN_USER_QUERY_KEY } from "./query-keys";

type LoginCredentials = {
  email: string;
  password: string;
};

const loginUser = async (credentials: LoginCredentials): Promise<UserType> => {
  const response = await ApiService.post("/login", credentials);
  return response.data;
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [LOGIN_USER_QUERY_KEY],
      }),
  });
};
