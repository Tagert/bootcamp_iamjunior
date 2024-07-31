import { format, parseISO } from "date-fns";
import { BookingType } from "../../../types/booking.type";

export const getReservedSlots = (
  date: Date,
  bookings: BookingType[]
): string[] => {
  const selectedDateString = format(date, "yyyy-MM-dd");
  return bookings
    .filter(
      (booking) =>
        format(parseISO(booking.booking_date), "yyyy-MM-dd") ===
        selectedDateString
    )
    .map((booking) => booking.time);
};
