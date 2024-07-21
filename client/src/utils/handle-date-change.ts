import { format, isBefore, startOfDay } from "date-fns";
import { WorkingHoursType } from "../types/business.type";
import { generateTimeSlots } from "./generate-time-slots";

type HandleDateChangeParams = {
  date: Date | null;
  working_hours: WorkingHoursType;
  setSelectedDate: (date: Date | null) => void;
  setTimeSlots: (slots: string[]) => void;
};

const isPastDate = (date: Date) => {
  return isBefore(startOfDay(date), startOfDay(new Date()));
};

export const handleDateChange = ({
  date,
  working_hours,
  setSelectedDate,
  setTimeSlots,
}: HandleDateChangeParams) => {
  if (date && isPastDate(date)) {
    return;
  }

  setSelectedDate(date);

  if (date) {
    const dayOfWeek = format(
      date,
      "EEEE"
    ).toLowerCase() as keyof WorkingHoursType;

    const dayHours = working_hours[dayOfWeek];

    if (
      dayHours &&
      dayHours.status === "open" &&
      dayHours.open &&
      dayHours.close
    ) {
      const slots = generateTimeSlots(dayHours.open, dayHours.close);

      setTimeSlots(slots);
    } else {
      setTimeSlots([]);
    }
  } else {
    setTimeSlots([]);
  }
};
