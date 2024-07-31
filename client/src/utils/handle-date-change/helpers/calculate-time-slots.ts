import { BookingType } from "../../../types/booking.type";
import { WorkingHoursType } from "../../../types/business.type";
import { generateTimeSlots } from "./generate-time-slots";
import { getDayName } from "./get-day-name";
import { isBusinessOpen } from "./is-business-open";
import { isSlotAvailable } from "./is-slots-available";

export const calculateTimeSlots = (
  selectedDate: Date,
  workingHours: WorkingHoursType,
  existingBookings: BookingType[]
): string[] => {
  const dayName = getDayName(selectedDate);
  const dayHours = workingHours[dayName];

  if (!isBusinessOpen(dayHours)) {
    return [];
  }

  const allSlots = generateTimeSlots(dayHours.open!, dayHours.close!);

  return allSlots.filter((slot) =>
    isSlotAvailable(slot, selectedDate, existingBookings)
  );
};
