import { findFirstOpenDay } from "../handle-date-change/helpers/find-first-open-day";
import { WorkingHoursType } from "../../types/business.type";

describe("findFirstOpenDay", () => {
  test("should return the first open day", () => {
    const workingHours: WorkingHoursType = {
      monday: { status: "closed" },
      tuesday: { open: "09:00", close: "17:00", status: "open" },
      wednesday: { open: "09:00", close: "17:00", status: "open" },
      thursday: { open: "09:00", close: "17:00", status: "open" },
      friday: { open: "09:00", close: "17:00", status: "open" },
      saturday: { status: "closed" },
      sunday: { status: "closed" },
    };

    const result = findFirstOpenDay(workingHours);
    expect(result).toEqual({
      day: "tuesday",
      hours: { open: "09:00", close: "17:00", status: "open" },
    });
  });

  test("should return null if no days are open", () => {
    const workingHours: WorkingHoursType = {
      monday: { status: "closed" },
      tuesday: { status: "closed" },
      wednesday: { status: "closed" },
      thursday: { status: "closed" },
      friday: { status: "closed" },
      saturday: { status: "closed" },
      sunday: { status: "closed" },
    };

    const result = findFirstOpenDay(workingHours);
    expect(result).toBeNull();
  });

  test("should handle an empty working hours object", () => {
    const workingHours = {} as WorkingHoursType;

    const result = findFirstOpenDay(workingHours);
    expect(result).toBeNull();
  });
});
