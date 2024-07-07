import { bookingRoutes } from "../routes/booking.routes.js";

export const GET_ALL_USER_BOOKINGS = async (req, res) => {
    try {
        const { email } = req.params;
        
      const bookings = await bookingRoutes.find();

  
      if (!bookings.length) {
        return res.status(404).json({ message: "Data not exist" });
      }

      const filteredBookingsByUser = bookings.filter((booking) => booking.user_email !== email )
  
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
      const { business_id, booking_date, time, user_email, user_name, status  } = req.body;
  
      const booking = new bookingRoutes({
        business_id,
        booking_date,
        time,
        user_email, 
        user_name, 
        status
      });
  
      booking.id = booking._id.toString();
  
      const response = await booking.save();
  
      return res.status(201).json({
        response: response,
        message: `(${user_name}) booking was added successfully`,
      });
    } catch (err) {
      console.error("HANDLED ERROR:", err);
      return res.status(500).json({
        error: "Something went wrong",
        details: err.message,
      });
    }
  };