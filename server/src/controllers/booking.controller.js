import { BookingModel } from "../models/booking.model.js";
import { BusinessModel } from "../models/business.model.js";
import { isValidTime } from "../utils/validations/time.validation.js";
import { formatDate } from "../utils/helpers/format-date.js";

export const GET_ALL_USER_BOOKINGS = async (req, res) => {
  try {
    const { email } = req.params;

    const bookings = await BookingModel.find();

    if (!bookings.length) {
      return res.status(404).json({ message: "Data not exist" });
    }

    const filteredBookingsByUser = bookings.filter((booking) => booking.user_email !== email);

    return res.status(200).json({ filteredBookingsByUser });
  } catch (err) {
    console.error("HANDLED ERROR:", err);
    return res.status(500).json({
      error: "Something went wrong",
      details: err.message,
    });
  }
};

export const INSERT_BOOKING = async (req, res) => {
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
  } catch (err) {
    console.error("HANDLED ERROR:", err);
    return res.status(500).json({
      error: "Something went wrong",
      details: err.message,
    });
  }
};

export const GET_BUSINESS_ID_BOOKING_BY_DATE = async (req, res) => {
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
  } catch (err) {
    console.error("Error during user deletion:", err);
    return res.status(500).json({
      error: "An error occurred during the deletion process.",
      details: err.message,
    });
  }
};

export const DELETE_BOOKING_BY_ID = async (req, res) => {
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
  } catch (err) {
    console.error("Error during user deletion:", err);
    return res.status(500).json({
      error: "An error occurred during the deletion process.",
      details: err.message,
    });
  }
};
