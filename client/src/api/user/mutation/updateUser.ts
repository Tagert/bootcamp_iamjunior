import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "../../../services/api.services";
import { USER_QUERY_KEY } from "../../query-keys";
import {
  LoginUserResponse,
  UserBody,
  UserType,
} from "../../../types/user.types";
import { useAuthStore } from "../../../store/use-auth.store";

const updateUser = async (userData: UserBody): Promise<UserType> => {
  const response = await ApiService.put("/user", userData);
  return response.data;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const updateUserStore = useAuthStore((state) => state.updateUser);
  const fetchUserData = useAuthStore((state) => state.fetchUserData);

  return useMutation({
    mutationFn: updateUser,

    onMutate: async (newUserData) => {
      await queryClient.cancelQueries({
        queryKey: [USER_QUERY_KEY, newUserData.id],
      });
      const previousUserData = queryClient.getQueryData([
        USER_QUERY_KEY,
        newUserData.id,
      ]) as UserType | undefined;

      queryClient.setQueryData(
        [USER_QUERY_KEY, newUserData.id],
        (old: UserType | undefined) => ({
          ...old,
          ...newUserData,
        })
      );

      updateUserStore(newUserData as Partial<LoginUserResponse>);

      return { previousUserData };
    },

    onError: (error, newUserData, context) => {
      queryClient.setQueryData(
        [USER_QUERY_KEY, newUserData.id],
        context?.previousUserData
      );
      updateUserStore(context?.previousUserData as Partial<LoginUserResponse>);
      console.error("Error updating user:", error);
    },

    onSettled: async (data, _, variables) => {
      if (variables.id) {
        await queryClient.invalidateQueries({
          queryKey: [USER_QUERY_KEY, variables.id],
        });
      }
      if (data && data.id) {
        await fetchUserData(data.id);
      }
    },
  });
};
