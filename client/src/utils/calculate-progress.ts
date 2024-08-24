import { ReviewType } from "../types/business.type";

export const calculateProgress = (rating: number, reviews: ReviewType[]) => {
  const totalReviews = reviews.length;
  const ratingCount = reviews.filter(
    (review) => review.rating === rating
  ).length;
  return (ratingCount / totalReviews) * 100;
};
