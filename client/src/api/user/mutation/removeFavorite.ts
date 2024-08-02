import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { ApiService } from "../../../services/api.services";
import { REMOVE_FAVORITE } from "../../query-keys";
import {
  FavoriteParams,
  FavoriteResponseType,
} from "../../../types/favorite.type";

const removeFavorite = async ({
  user_id,
  business_id,
}: FavoriteParams): Promise<FavoriteResponseType> => {
  const response = await ApiService.delete(`/user/favorites`, {
    data: { user_id, business_id },
  });

  return response.data;
};

export const useRemoveFavorite = (): UseMutationResult<
  FavoriteResponseType,
  Error,
  FavoriteParams,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFavorite,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [REMOVE_FAVORITE] });
      queryClient.invalidateQueries({ queryKey: ["user", variables.user_id] });
      queryClient.invalidateQueries({
        queryKey: ["business", variables.business_id],
      });
    },
    onError: (error) => {
      console.error("Error removing favorite:", error);
    },
  });
};
