import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../services/api.services";
import { BusinessType } from "../types/business.type";
import { SIMILAR_BUSINESSES } from "./query-keys";

const fetchSimilarBusiness = async (
  businessId: string
): Promise<BusinessType[]> => {
  try {
    const response = await ApiService.get(`/business/${businessId}/similar`);
    return response.data;
  } catch (error) {
    console.error("Error fetching similar businesses:", error);
    throw error;
  }
};

export const useSimilarBusiness = (businessId: string) => {
  return useQuery<BusinessType[], Error>({
    queryKey: [SIMILAR_BUSINESSES, businessId],
    queryFn: () => fetchSimilarBusiness(businessId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
