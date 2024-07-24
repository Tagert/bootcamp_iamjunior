import { formatDate } from "../format-date";
import { format } from "date-fns";

describe("formatDate", () => {
  test('should format date correctly to "yyyy-MM-dd"', () => {
    const date = new Date("2023-07-24T00:00:00Z");
    expect(formatDate(date)).toBe("2023-07-24");
  });

  test("should format a different date correctly", () => {
    const date = new Date("2022-12-25T00:00:00Z");
    expect(formatDate(date)).toBe("2022-12-25");
  });

  test("should format the current date correctly", () => {
    const date = new Date();
    expect(formatDate(date)).toBe(format(date, "yyyy-MM-dd"));
  });

  test("should format leap year date correctly", () => {
    const date = new Date("2024-02-29T00:00:00Z");
    expect(formatDate(date)).toBe("2024-02-29");
  });

  test("should format date at end of year correctly", () => {
    const date = new Date("2023-12-31T00:00:00Z");
    expect(formatDate(date)).toBe("2023-12-31");
  });
});
