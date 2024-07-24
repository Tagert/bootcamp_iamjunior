import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiService } from "../../services/api.services";
import { CreateUserResponse, UserType } from "../../types/user.types";
import { CREATE_USER_QUERY_KEY } from "../query-keys";

const createUser = async (user: UserType): Promise<CreateUserResponse> => {
  const response = await ApiService.post("/register", user);
  return response.data;
};

export const useCreateUser = (): UseMutationResult<
  CreateUserResponse,
  Error,
  UserType,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [CREATE_USER_QUERY_KEY] }),
  });
};
