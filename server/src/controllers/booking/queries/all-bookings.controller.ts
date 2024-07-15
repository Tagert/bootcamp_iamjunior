import type { RequestHandler } from "express";
import type { BookingType } from "../../../models/booking.model";
import { BookingModel } from "../../../models/booking.model";

export const GET_ALL_USER_BOOKINGS: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const bookings = await BookingModel.find();

    if (!bookings.length) {
      return res.status(404).json({ message: "Data not exist" });
    }

    const filteredBookingsByUser = bookings.filter((booking: BookingType) => booking.user_id !== id);

    return res.status(200).json({ filteredBookingsByUser });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error during getting all bookings:", err);
      return res.status(500).json({
        error: "An error occurred during the getting process.",
        details: err.message,
      });
    } else {
      console.error("Unknown error during getting all bookings:", err);
      return res.status(500).json({
        error: "An unknown error occurred during the getting process.",
        details: String(err),
      });
    }
  }
};
