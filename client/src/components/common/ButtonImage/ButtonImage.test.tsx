// ButtonImage.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { ButtonImage } from "./ButtonImage";
import styles from "./ButtonImage.module.scss";

describe("ButtonImage component", () => {
  test("renders the button with image and text", () => {
    render(
      <ButtonImage
        imgSrc="test-image-src"
        className="custom-class"
        text="Click me"
      />
    );
    const buttonElement = screen.getByRole("button");
    const imgElement = screen.getByRole("img");
    const textElement = screen.getByText(/click me/i);

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("custom-class");
    expect(buttonElement).toHaveClass(styles.buttonImage);

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", "test-image-src");
    expect(imgElement).toHaveAttribute("alt", "search icon");

    expect(textElement).toBeInTheDocument();
  });

  test("renders the button without text", () => {
    render(<ButtonImage imgSrc="test-image-src" className="custom-class" />);
    const buttonElement = screen.getByRole("button");
    const imgElement = screen.getByRole("img");

    expect(buttonElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
    expect(screen.queryByText(/click me/i)).not.toBeInTheDocument();
  });

  test("handles click events", () => {
    const handleClick = jest.fn();
    render(
      <ButtonImage
        imgSrc="test-image-src"
        className="custom-class"
        text="Click me"
        onClick={handleClick}
      />
    );
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
