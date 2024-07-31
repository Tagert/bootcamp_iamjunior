import { addMinutes, format, parse } from "date-fns";

export const generateTimeSlots = (
  openTime: string,
  closeTime: string,
  interval: number = 30
): string[] => {
  const startTime = parse(openTime, "HH:mm", new Date());
  const endTime = parse(closeTime, "HH:mm", new Date());

  const slots: string[] = [];
  let currentTime = startTime;

  while (currentTime < endTime) {
    slots.push(format(currentTime, "HH:mm"));
    currentTime = addMinutes(currentTime, interval);
  }

  return slots;
};
