import { useState, useEffect } from "react";
import { useAuthStore } from "../store/use-auth.store";
import { useAddFavorite } from "../api/user/mutation/addFavorite";
import { useRemoveFavorite } from "../api/user/mutation/removeFavorite";
import { LoginUserResponse } from "../types/user.types";

export const useFavorite = (business_id: string) => {
  const { user, updateUser, fetchUserData } = useAuthStore();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: removeFavorite } = useRemoveFavorite();

  useEffect(() => {
    if (user) {
      setIsFavorite(user.favorites?.includes(business_id) ?? false);
    }
  }, [user, business_id]);

  const toggleFavorite = () => {
    if (!user || isUpdating) return;

    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    setIsUpdating(true);

    updateFavorites(newFavoriteStatus, user);
  };

  const updateFavorites = (
    newFavoriteStatus: boolean,
    user: LoginUserResponse
  ) => {
    const updatedFavorites = getUpdatedFavorites(newFavoriteStatus, user);

    updateUser({ ...user, favorites: updatedFavorites });

    const favoriteAction = newFavoriteStatus ? addFavorite : removeFavorite;

    favoriteAction(
      { user_id: user.id, business_id },
      {
        onSuccess: () => handleSuccess(user.id),
        onError: (error) => handleError(error, newFavoriteStatus),
      }
    );
  };

  const getUpdatedFavorites = (
    newFavoriteStatus: boolean,
    user: LoginUserResponse
  ) => {
    return newFavoriteStatus
      ? [...user.favorites, business_id]
      : user.favorites.filter((favId) => favId !== business_id);
  };

  const handleSuccess = async (userId: string) => {
    await fetchUserData(userId);
    setIsUpdating(false);
  };

  const handleError = (error: Error, newFavoriteStatus: boolean) => {
    console.error("Error updating favorite:", error);
    setIsFavorite(!newFavoriteStatus);
    setIsUpdating(false);
  };

  return { isFavorite, toggleFavorite, isUpdating };
};
