import type { RequestHandler } from "express";
import { BookingModel } from "../../../models/booking.model";

export const DELETE_BOOKING_BY_ID: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    const booking = await BookingModel.findOne({ id });

    if (!booking) {
      return res.status(404).json({
        message: `Business with this ID (${id}) does not exist`,
      });
    }

    if (booking.user_id !== user_id) {
      return res.status(401).json({
        message: "You are not authorized to take any actions on this data.",
      });
    }

    const deletionResult = await BookingModel.deleteOne({ id });

    return res.status(200).json({
      message: `Booking with ID (${id}) was deleted`,
      response: deletionResult,
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error during booking deletion:", err);
      return res.status(500).json({
        error: "An error occurred during the deletion process.",
        details: err.message,
      });
    } else {
      console.error("Unknown error during booking deletion:", err);
      return res.status(500).json({
        error: "An unknown error occurred during the deletion process.",
        details: String(err),
      });
    }
  }
};
