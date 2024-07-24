import { getInitials } from "../get-initials";

describe("getInitials", () => {
  test("should return an empty string when name is empty", () => {
    expect(getInitials("")).toBe("");
  });

  test("should capitalize the first letter and lowercase the second letter", () => {
    expect(getInitials("john")).toBe("Jo");
    expect(getInitials("JOHN")).toBe("Jo");
    expect(getInitials("jOhN")).toBe("Jo");
  });

  test("should correctly process longer strings", () => {
    expect(getInitials("javascript")).toBe("Ja");
    expect(getInitials("JaVaScRiPt")).toBe("Ja");
  });
});
