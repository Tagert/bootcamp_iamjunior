import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "../services/api.services";
import { UserType } from "../types/user.types";
import { CREATE_USER_QUERY_KEY } from "./query-keys";

const createUser = async (user: UserType): Promise<UserType> => {
  const response = await ApiService.post("/register", user);
  return response.data;
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [CREATE_USER_QUERY_KEY] }),
  });
};
