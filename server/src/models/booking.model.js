const bookingSchema = mongoose.Schema({
  business_id: { type: String, required: true },
  booking_date: { type: Date, required: true },
  time: { type: String, required: true },
  user_email: { type: String, required: true },
  user_name: { type: String, required: true },
  status: { type: String, required: true },
});

export const BookingModel = mongoose.model("bookings", bookingSchema);
