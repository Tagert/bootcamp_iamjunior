import { format } from "date-fns";
import { WorkingHoursType } from "../types/business.type";
import { generateTimeSlots } from "./generate-time-slots";
import { isPastDate } from "./is-past-date";

type HandleDateChangeParams = {
  date: Date | null;
  working_hours: WorkingHoursType;
  setSelectedDate: (date: Date | null) => void;
  setTimeSlots: (slots: string[]) => void;
};

export const handleDateChange = ({
  date,
  working_hours,
  setSelectedDate,
  setTimeSlots,
}: HandleDateChangeParams) => {
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
      const validSlots = slots.filter((slot) => !isPastDate(slot, date));

      setTimeSlots(validSlots);
    } else {
      setTimeSlots([]);
    }
  } else {
    setTimeSlots([]);
  }
};
