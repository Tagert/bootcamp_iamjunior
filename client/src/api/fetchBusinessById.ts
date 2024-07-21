import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../services/api.services";
import { BusinessType } from "../types/business.type";
import { BUSINESS_QUERY_KEY } from "./query-keys";

const fetchBusinessesById = async (id: string): Promise<BusinessType> => {
  const response = await ApiService.get(`/business/${id}`);

  return response.data;
};

export const useBusiness = (id: string) => {
  return useQuery({
    queryKey: [BUSINESS_QUERY_KEY, id],
    queryFn: () => fetchBusinessesById(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
