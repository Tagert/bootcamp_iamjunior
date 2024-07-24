import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button component", () => {
  test("renders the button with default props", () => {
    render(<Button title="Click me" className="custom-class" />);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("custom-class");
    expect(buttonElement).toHaveClass("mainBtn");
    expect(buttonElement).toHaveAttribute("type", "button");
  });

  test("renders the button with provided type", () => {
    render(<Button title="Submit" className="custom-class" type="submit" />);
    const buttonElement = screen.getByRole("button", { name: /submit/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("custom-class");
    expect(buttonElement).toHaveClass("mainBtn");
    expect(buttonElement).toHaveAttribute("type", "submit");
  });

  test("handles click events", () => {
    const handleClick = jest.fn();
    render(
      <Button title="Click me" className="custom-class" onClick={handleClick} />
    );
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("handles disabled state", () => {
    render(<Button title="Click me" className="custom-class" disabled />);
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toBeDisabled();
  });
});
