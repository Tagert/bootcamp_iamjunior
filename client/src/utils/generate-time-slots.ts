import { format } from "date-fns";
import { TIME_SLOT_INTERVAL } from "../constants/time-slot-interval";

export const generateTimeSlots = (open: string, close: string) => {
  const timeSlots: string[] = [];
  const [openHour, openMinute] = open.split(":").map(Number);
  const [closeHour, closeMinute] = close.split(":").map(Number);

  const start = new Date(2024, 0, 1, openHour, openMinute);
  const end = new Date(2024, 0, 1, closeHour, closeMinute);

  while (start < end) {
    timeSlots.push(format(start, "HH:mm"));
    start.setMinutes(start.getMinutes() + TIME_SLOT_INTERVAL);
  }

  return timeSlots;
};
