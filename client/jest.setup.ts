import "@testing-library/jest-dom";

jest.mock("./src/constants/environment", () => ({
  PROD: "development",
}));
