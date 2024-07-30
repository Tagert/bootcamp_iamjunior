import type { RequestHandler } from "express";
import type { BookingType } from "../../../models/booking.model";
import { BookingModel } from "../../../models/booking.model";
import { handleError } from "../../../utils/handleError";

export const GET_ALL_USER_BOOKINGS: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const bookings = await BookingModel.find();

    if (!bookings.length) {
      return res.status(404).json({ message: "Data not exist" });
    }

    const filteredBookingsByUser = bookings.filter((booking: BookingType) => booking.user_id === id);

    return res.status(200).json(filteredBookingsByUser);
  } catch (err: unknown) {
    handleError(err, res, "getting all user bookings");
  }
};
