import { isSameDay, parseISO } from "date-fns";
import { BookingType } from "../../../types/booking.type";

export const isSlotAvailable = (
  slot: string,
  date: Date,
  bookings: BookingType[]
): boolean =>
  !bookings.some(
    (booking) =>
      isSameDay(parseISO(booking.booking_date), date) && booking.time === slot
  );
