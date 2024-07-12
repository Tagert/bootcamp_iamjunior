import type { RequestHandler } from "express";
import { BookingModel } from "../../../models/booking.model.js";
import { isValidTime } from "../../../utils/validations/time.validation.js";
import { formatDate } from "../../../utils/helpers/format-date.js";

export const INSERT_BOOKING: RequestHandler = async (req, res) => {
  try {
    const { business_id } = req.params;
    const { booking_date, time, user_id, user_email, user_name, status } = req.body;

    const formattedDate = formatDate(booking_date);

    if (!isValidTime(time)) {
      return res.status(400).json({ message: "Invalid time format. Please use 'HH:mm' format." });
    }

    const existingBooking = await BookingModel.findOne({ business_id, booking_date: formattedDate, time });

    if (existingBooking) {
      return res
        .status(409)
        .json({ message: `A booking for business ID (${business_id}) on ${booking_date} at ${time} already exists.` });
    }

    const booking = new BookingModel({
      business_id,
      booking_date: formattedDate,
      time,
      user_id,
      user_name,
      user_email,
      status,
    });

    booking.id = booking._id.toString();

    const response = await booking.save();

    return res.status(201).json({
      response: response,
      message: `Booking for ${user_name} was added successfully`,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error during booking deletion:", err);
      return res.status(500).json({
        error: "An unknown error occurred while trying to insert the data.",
        details: err.message,
      });
    } else {
      console.error("Unknown error occurred while trying to insert booking data:", err);
      return res.status(500).json({
        error: "An unknown error occurred while trying to insert the data.",
        details: String(err),
      });
    }
  }
};
