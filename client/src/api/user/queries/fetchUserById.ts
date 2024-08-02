import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../../services/api.services";
import { UserType } from "../../../types/user.types";
import { USER_QUERY_KEY } from "../../query-keys";

export const fetchUserById = async (id: string): Promise<UserType> => {
  const response = await ApiService.get(`/user/${id}`);

  return response.data;
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: [USER_QUERY_KEY, id],
    queryFn: () => fetchUserById(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
