import type { RequestHandler } from "express";
import type { BookingType } from "../../../models/booking.model";
import { BookingModel } from "../../../models/booking.model";
import { handleError } from "../../../utils/handleError";

export const GET_BOOKINGS_BY_BUSINESS: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const bookings: BookingType[] = await BookingModel.find({ business_id: id });

    if (!bookings.length) {
      return res.status(404).json({ message: "Data not exist" });
    }

    return res.status(200).json(bookings);
  } catch (err: unknown) {
    handleError(err, res, "getting bookings");
  }
};
