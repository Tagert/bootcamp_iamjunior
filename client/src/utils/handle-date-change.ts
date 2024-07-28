import { format, parseISO } from "date-fns";
import { WorkingHoursType } from "../types/business.type";
import { BookingType } from "../types/booking.type";
import { generateTimeSlots } from "./generate-time-slots";
import { isPastDate } from "./is-past-date";

type HandleDateChangeParams = {
  date: Date | null;
  working_hours: WorkingHoursType;
  setSelectedDate: (date: Date | null) => void;
  setTimeSlots: (slots: string[]) => void;
  bookings: BookingType[];
};

export const handleDateChange = ({
  date,
  working_hours,
  setSelectedDate,
  setTimeSlots,
  bookings,
}: HandleDateChangeParams) => {
  setSelectedDate(date);

  if (date) {
    const dayOfWeek = format(
      date,
      "EEEE"
    ).toLowerCase() as keyof WorkingHoursType;
    const dayHours = working_hours[dayOfWeek];

    if (
      dayHours &&
      dayHours.status === "open" &&
      dayHours.open &&
      dayHours.close
    ) {
      const slots = generateTimeSlots(dayHours.open, dayHours.close);
      const selectedDateString = format(date, "yyyy-MM-dd");

      const reservedSlots = bookings
        .filter((booking) => {
          const formattedBookingDate = format(
            parseISO(booking.booking_date),
            "yyyy-MM-dd"
          );

          return formattedBookingDate === selectedDateString;
        })
        .map((booking) => booking.time);

      const validSlots = slots.filter(
        (slot) => !isPastDate(slot, date) && !reservedSlots.includes(slot)
      );

      setTimeSlots(validSlots);
    } else {
      setTimeSlots([]);
    }
  } else {
    setTimeSlots([]);
  }
};
