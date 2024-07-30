import type { RequestHandler } from "express";
import { BookingModel } from "../../../models/booking.model";
import { handleError } from "../../../utils/handleError";

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
    handleError(err, res, "booking deletion");
  }
};
