import { handleDateChange } from "../handle-date-change/handle-date-change";
import { WorkingHoursType } from "../../types/business.type";
import { generateTimeSlots } from "../handle-date-change/helpers/generate-time-slots";
import { format, startOfDay } from "date-fns";
import { BookingType } from "../../types/booking.type";

jest.mock("../handle-date-change/helpers/generate-time-slots", () => ({
  generateTimeSlots: jest.fn(),
}));

describe("handleDateChange", () => {
  let setSelectedDateMock: jest.Mock;
  let setTimeSlotsMock: jest.Mock;
  let workingHours: WorkingHoursType;
  let bookings: BookingType[];

  beforeEach(() => {
    setSelectedDateMock = jest.fn();
    setTimeSlotsMock = jest.fn();
    workingHours = {
      monday: { open: "09:00", close: "17:00", status: "open" },
      tuesday: { open: "09:00", close: "17:00", status: "open" },
      wednesday: { open: "09:00", close: "17:00", status: "open" },
      thursday: { open: "09:00", close: "17:00", status: "open" },
      friday: { open: "09:00", close: "17:00", status: "open" },
      saturday: { status: "closed" },
      sunday: { status: "closed" },
    };
    bookings = [];
  });

  test("should set selected date to null and time slots to empty array when date is null", () => {
    handleDateChange({
      date: null,
      working_hours: workingHours,
      setSelectedDate: setSelectedDateMock,
      setTimeSlots: setTimeSlotsMock,
      bookings: bookings,
    });

    expect(setSelectedDateMock).toHaveBeenCalledWith(null);
    expect(setTimeSlotsMock).toHaveBeenCalledWith([]);
  });

  test("should not change selected date or time slots when date is in the past", () => {
    const pastDate = startOfDay(new Date("2023-01-01"));

    handleDateChange({
      date: pastDate,
      working_hours: workingHours,
      setSelectedDate: setSelectedDateMock,
      setTimeSlots: setTimeSlotsMock,
      bookings: bookings,
    });

    expect(setSelectedDateMock).toHaveBeenCalledWith(pastDate);
    expect(setTimeSlotsMock).toHaveBeenCalledWith([]);
  });

  test("should generate time slots when date is in the future and working hours are open", () => {
    const futureDate = startOfDay(new Date("2024-12-25"));
    const slots = ["09:00", "10:00", "11:00"];
    (generateTimeSlots as jest.Mock).mockReturnValue(slots);

    handleDateChange({
      date: futureDate,
      working_hours: workingHours,
      setSelectedDate: setSelectedDateMock,
      setTimeSlots: setTimeSlotsMock,
      bookings: bookings,
    });

    expect(setSelectedDateMock).toHaveBeenCalledWith(futureDate);
    expect(setTimeSlotsMock).toHaveBeenCalledWith(slots);
  });

  test("should set time slots to empty array when date is in the future but working hours are closed", () => {
    const futureDate = startOfDay(new Date("2024-12-25"));
    const dayOfWeek = format(
      futureDate,
      "EEEE"
    ).toLowerCase() as keyof WorkingHoursType;
    workingHours[dayOfWeek] = { status: "closed" };

    handleDateChange({
      date: futureDate,
      working_hours: workingHours,
      setSelectedDate: setSelectedDateMock,
      setTimeSlots: setTimeSlotsMock,
      bookings: bookings,
    });

    expect(setSelectedDateMock).toHaveBeenCalledWith(futureDate);
    expect(setTimeSlotsMock).toHaveBeenCalledWith([]);
  });

  test("should set time slots to empty array when date is in the future but working hours are incomplete", () => {
    const futureDate = startOfDay(new Date("2024-12-25"));
    const dayOfWeek = format(
      futureDate,
      "EEEE"
    ).toLowerCase() as keyof WorkingHoursType;
    workingHours[dayOfWeek] = { status: "open", open: "09:00" };

    handleDateChange({
      date: futureDate,
      working_hours: workingHours,
      setSelectedDate: setSelectedDateMock,
      setTimeSlots: setTimeSlotsMock,
      bookings: bookings,
    });

    expect(setSelectedDateMock).toHaveBeenCalledWith(futureDate);
    expect(setTimeSlotsMock).toHaveBeenCalledWith([]);
  });
});
