// src/hooks/useFavorite.ts
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/use-auth.store";
import { useAddFavorite } from "../api/user/mutation/addFavorite";
import { useRemoveFavorite } from "../api/user/mutation/removeFavorite";

export const useFavorite = (business_id: string) => {
  const { user, updateUser, fetchUserData } = useAuthStore();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const { mutate: addFavorite } = useAddFavorite();
  const { mutate: removeFavorite } = useRemoveFavorite();

  useEffect(() => {
    if (user) {
      setIsFavorite(user.favorites.includes(business_id));
    }
  }, [user, business_id]);

  const toggleFavorite = async () => {
    if (!user || isUpdating) return;

    const newFavoriteStatus = !isFavorite;
    // setIsFavorite(newFavoriteStatus);
    setIsUpdating(true);

    try {
      const updatedFavorites = newFavoriteStatus
        ? [...user.favorites, business_id]
        : user.favorites.filter((favId) => favId !== business_id);

      updateUser({ favorites: updatedFavorites });

      if (newFavoriteStatus) {
        addFavorite({ user_id: user.id, business_id });
      } else {
        removeFavorite({ user_id: user.id, business_id });
      }

      await fetchUserData(user.id);
    } catch (error) {
      console.error("Failed to update favorites:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return { isFavorite, toggleFavorite };
};
