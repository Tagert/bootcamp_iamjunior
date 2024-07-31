import { format } from "date-fns";
import { WorkingHoursType } from "../../../types/business.type";

export const getDayHours = (date: Date, working_hours: WorkingHoursType) => {
  const dayOfWeek = format(
    date,
    "EEEE"
  ).toLowerCase() as keyof WorkingHoursType;
  return working_hours[dayOfWeek];
};
