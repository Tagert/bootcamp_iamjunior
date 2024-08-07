import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiService } from "../../../services/api.services";
import { ChangePasswordResponse } from "../../../types/user.types";
import { CHANGE_PASSWORD } from "../../query-keys";

type ChangePasswordParams = {
  id: string | undefined;
  currentPassword: string;
  newPassword: string;
};

export const changePassword = async ({
  id,
  currentPassword,
  newPassword,
}: ChangePasswordParams): Promise<ChangePasswordResponse> => {
  const response = await ApiService.post(`/change-password/${id}`, {
    currentPassword,
    newPassword,
  });

  return response.data;
};

export const useChangePassword = (): UseMutationResult<
  ChangePasswordResponse,
  Error,
  ChangePasswordParams,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CHANGE_PASSWORD] });
    },
    onError: (error) => {
      console.error("Error changing password:", error);
    },
  });
};
