import { formatWorkingHours } from "../format-working-hours";

describe("formatWorkingHours", () => {
  test('should return "Closed" when status is closed', () => {
    const hours = { status: "closed" };
    expect(formatWorkingHours(hours)).toBe("Closed");
  });

  test("should return formatted open and close times when status is not closed", () => {
    const hours = { open: "09:00", close: "17:00", status: "open" };
    expect(formatWorkingHours(hours)).toBe("\n    09:00 - 17:00");
  });
});
