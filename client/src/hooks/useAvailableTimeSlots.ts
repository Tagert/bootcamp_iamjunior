import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import { useBusinessBookings } from "../api/booking/queries/fetchBookingsByBusiness";
import { generateTimeSlots } from "../utils/handle-date-change/helpers/generate-time-slots";
import { isPastDate } from "../utils/handle-date-change/helpers/is-past-date";
import { WorkingHoursType } from "../types/business.type";

type useAvailableTimeSlotsProps = {
  business_id: string | "";
  selectedDate: Date | null;
  working_hours: WorkingHoursType;
};

export const useAvailableTimeSlots = ({
  business_id,
  selectedDate,
  working_hours,
}: useAvailableTimeSlotsProps): {
  timeSlots: string[];
  refetch: () => void;
} => {
  const { data: bookings = [], refetch } = useBusinessBookings(business_id);

  const timeSlots = useMemo(() => {
    if (!selectedDate) return [];

    const dayOfWeek = format(
      selectedDate,
      "EEEE"
    ).toLowerCase() as keyof WorkingHoursType;
    const dayHours = working_hours[dayOfWeek];

    if (
      !dayHours ||
      dayHours.status !== "open" ||
      !dayHours.open ||
      !dayHours.close
    ) {
      return [];
    }

    const slots = generateTimeSlots(dayHours.open, dayHours.close);
    const selectedDateString = format(selectedDate, "yyyy-MM-dd");

    const reservedSlots = bookings
      .filter((booking) => {
        const formattedBookingDate = format(
          parseISO(booking.booking_date),
          "yyyy-MM-dd"
        );
        return formattedBookingDate === selectedDateString;
      })
      .map((booking) => booking.time);

    return slots.filter(
      (slot) => !isPastDate(slot, selectedDate) && !reservedSlots.includes(slot)
    );
  }, [bookings, selectedDate, working_hours]);

  return { timeSlots, refetch };
};
