import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiService } from "../../../services/api.services";
import { ADD_FAVORITE } from "../../query-keys";
import {
  FavoriteParams,
  FavoriteResponseType,
} from "../../../types/favorite.type";

const addFavorite = async ({
  user_id,
  business_id,
}: FavoriteParams): Promise<FavoriteResponseType> => {
  const response = await ApiService.post(`/user/favorites`, {
    user_id,
    business_id,
  });

  return response.data;
};

export const useAddFavorite = (): UseMutationResult<
  FavoriteResponseType,
  Error,
  FavoriteParams,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addFavorite,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [ADD_FAVORITE] });
      queryClient.invalidateQueries({ queryKey: ["user", variables.user_id] });
      queryClient.invalidateQueries({
        queryKey: ["business", variables.business_id],
      });
    },
    onError: (error) => {
      console.error("Error adding favorite:", error);
    },
  });
};
