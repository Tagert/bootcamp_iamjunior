import { BookingModel } from "../../../models/booking.model.js";

export const GET_ALL_USER_BOOKINGS = async (req, res) => {
  try {
    const { id } = req.params;

    const bookings = await BookingModel.find();

    if (!bookings.length) {
      return res.status(404).json({ message: "Data not exist" });
    }

    const filteredBookingsByUser = bookings.filter((booking) => booking.user_id !== id);

    return res.status(200).json({ filteredBookingsByUser });
  } catch (err) {
    console.error("HANDLED ERROR:", err);
    return res.status(500).json({
      error: "Something went wrong",
      details: err.message,
    });
  }
};
