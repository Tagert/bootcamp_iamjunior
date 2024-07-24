import { useQuery } from "@tanstack/react-query";
import { ApiService } from "../../../services/api.services";
import { CategoryType } from "../../../types/category.types";
import { CATEGORIES_QUERY_KEY } from "../../query-keys";

const fetchCategories = async (): Promise<CategoryType[]> => {
  const response = await ApiService.get("/categories");

  return response.data;
};

export const useCategories = () => {
  return useQuery({
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
