import { WorkingHoursType } from "../../types/business.type";
import { BookingType } from "../../types/booking.type";
import { generateTimeSlots } from "./helpers/generate-time-slots";
import { getDayHours } from "./helpers/get-day-hours";
import { isBusinessOpen } from "./helpers/is-business-open";
import { getReservedSlots } from "./helpers/get-reserved-slots";
import { isValidSlot } from "./helpers/is-valid-slot";

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
  if (!date) {
    setSelectedDate(null);
    setTimeSlots([]);

    return;
  }

  setSelectedDate(date);

  const dayHours = getDayHours(date, working_hours);

  if (!isBusinessOpen(dayHours)) {
    setTimeSlots([]);
    return;
  }

  const slots = generateTimeSlots(dayHours.open!, dayHours.close!);
  const reservedSlots = getReservedSlots(date, bookings);
  const validSlots = slots.filter((slot) =>
    isValidSlot(slot, date, reservedSlots)
  );

  setTimeSlots(validSlots);
};
