import { WorkingHoursType } from "../../../types/business.type";

export const getDayName = (date: Date): keyof WorkingHoursType => {
  const days: (keyof WorkingHoursType)[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return days[date.getDay()];
};
