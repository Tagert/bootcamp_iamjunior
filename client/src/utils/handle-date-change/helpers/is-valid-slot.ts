import { isPastDate } from "./is-past-date";

export const isValidSlot = (
  slot: string,
  date: Date,
  reservedSlots: string[]
) => !isPastDate(slot, date) && !reservedSlots.includes(slot);
