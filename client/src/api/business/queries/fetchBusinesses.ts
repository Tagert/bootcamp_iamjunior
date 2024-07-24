import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../../services/api.services";
import { BusinessType } from "../../../types/business.type";
import { BUSINESSES_QUERY_KEY } from "../../query-keys";

const fetchBusinesses = async (): Promise<BusinessType[]> => {
  const response = await ApiService.get("/businesses");

  return response.data;
};

export const useBusinesses = () => {
  return useQuery({
    queryKey: [BUSINESSES_QUERY_KEY],
    queryFn: fetchBusinesses,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
