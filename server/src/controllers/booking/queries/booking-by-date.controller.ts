import type { RequestHandler } from "express";
import { BookingModel } from "../../../models/booking.model.js";
import { BusinessModel } from "../../../models/business.model.js";
import { formatDate } from "../../../utils/helpers/format-date.js";

export const GET_BUSINESS_ID_BOOKING_BY_DATE: RequestHandler = async (req, res) => {
  try {
    const { id, date } = req.params;

    const formattedDate = formatDate(date);

    const business = await BusinessModel.findOne({ id });

    if (!business) {
      return res.status(404).json({
        message: `Business with this ID (${id}) does not exist`,
      });
    }

    const bookings = await BookingModel.find({
      business_id: id,
      booking_date: formattedDate,
    });

    return res.status(200).json({
      response: bookings,
      message: `Bookings for business ID (${id}) on date (${date}) retrieved successfully`,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error during getting booking by date:", err);
      return res.status(500).json({
        error: "An error occurred during the getting process.",
        details: err.message,
      });
    } else {
      console.error("Unknown error during the getting process:", err);
      return res.status(500).json({
        error: "An unknown error occurred during the getting process.",
        details: String(err),
      });
    }
  }
};
