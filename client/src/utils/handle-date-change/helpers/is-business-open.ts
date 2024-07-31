import { WorkingHoursType } from "../../../types/business.type";

export const isBusinessOpen = (
  dayHours: WorkingHoursType[keyof WorkingHoursType]
): boolean => dayHours.status === "open" && !!dayHours.open && !!dayHours.close;
