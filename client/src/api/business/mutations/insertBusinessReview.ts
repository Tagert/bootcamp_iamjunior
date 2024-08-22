import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiService } from "../../../services/api.services";
import { REVIEW_KEY } from "../../query-keys";

const insertReview = async (review: {
  rating: number;
  comment: string;
  business_id: string;
}) => {
  const response = await ApiService.post(
    `/business/${review.business_id}/review`,
    {
      rating: review.rating,
      comment: review.comment,
    }
  );

  return response.data;
};

export const useInsertReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: insertReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REVIEW_KEY] });
    },
  });
};
