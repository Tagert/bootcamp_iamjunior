import type { RequestHandler } from "express";
import { format } from "date-fns";
import { BusinessModel } from "../../../models/business.model";
import { handleError } from "../../../utils/handleError";

export const LEAVE_REVIEW: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, rating, comment } = req.body;

    const business = await BusinessModel.findOne({ id });

    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    const existingReview = business.reviews.find((review) => review.user_id === user_id);

    if (existingReview) {
      return res.status(400).json({ error: "You have already reviewed this business." });
    }

    const formattedDate = format(new Date(), "yyyy-MM-dd HH:mm:ss");

    business.reviews.push({
      user_id,
      rating,
      comment,
      date: formattedDate,
    });

    business.review_count = business.reviews.length;

    const totalRating = business.reviews.reduce((acc, review) => acc + review.rating, 0);
    business.average_rating = totalRating / business.review_count;

    const response = await business.save();

    res.status(200).json({ response, message: "Review added successfully" });
  } catch (err: unknown) {
    handleError(err, res, "adding business review");
  }
};
