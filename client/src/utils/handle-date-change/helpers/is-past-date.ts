import { isBefore, addHours } from "date-fns";

export const isPastDate = (slot: string, date: Date) => {
  const [hours, minutes] = slot.split(":").map(Number);

  const slotDateTime = new Date(date);
  slotDateTime.setHours(hours, minutes, 0, 0);

  return isBefore(slotDateTime, addHours(new Date(), 24));
};
