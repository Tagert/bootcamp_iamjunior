import { generateTimeSlots } from "../generate-time-slots";

describe("generateTimeSlots", () => {
  test("generates correct time slots for given open and close times", () => {
    const open = "09:00";
    const close = "11:30";

    const expectedTimeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00"];

    const result = generateTimeSlots(open, close);

    expect(result).toEqual(expectedTimeSlots);
  });

  test("should return an empty array if the open and close times are the same", () => {
    const open = "09:00";
    const close = "09:00";
    const expectedSlots: string[] = [];

    const result = generateTimeSlots(open, close);

    expect(result).toEqual(expectedSlots);
  });

  test("should handle cases where the close time is just after the open time", () => {
    const open = "09:00";
    const close = "09:30";
    const expectedSlots = ["09:00"];

    const result = generateTimeSlots(open, close);

    expect(result).toEqual(expectedSlots);
  });

  test("should handle midnight crossover case", () => {
    const open = "23:00";
    const close = "00:30";
    const expectedSlots: [] = [];

    const result = generateTimeSlots(open, close);

    expect(result).toEqual(expectedSlots);
  });
});
