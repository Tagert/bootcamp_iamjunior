import { WorkingHoursType } from "../../../types/business.type";

export const findFirstOpenDay = (working_hours: WorkingHoursType) => {
  const days = Object.entries(working_hours);
  for (const [day, hours] of days) {
    if (hours.status === "open") {
      return { day, hours };
    }
  }
  return null;
};
