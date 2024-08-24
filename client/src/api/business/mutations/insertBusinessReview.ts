import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "../../../services/api.services";
import { BUSINESS_QUERY_KEY } from "../../query-keys";
import { LeaveReviewFormValues } from "../../../types/form.type";

const insertReview = async (
  review: LeaveReviewFormValues & { business_id: string }
) => {
  const response = await ApiService.post(
    `/business/${review.business_id}/review`,
    {
      rating: review.rating,
      title: review.title,
      description: review.description,
    }
  );

  return response.data;
};

export const useInsertReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: insertReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BUSINESS_QUERY_KEY] });
    },
  });
};
