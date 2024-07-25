import { render } from "@testing-library/react";
import { Spinner } from "./Spinner";
import styles from "./Spinner.module.scss";

describe("Spinner component", () => {
  test("renders the spinner", () => {
    const { container } = render(<Spinner />);
    const spinnerDiv = container.querySelector(`.${styles.spinner}`);
    const loaderSpan = container.querySelector(`.${styles.loader}`);

    expect(spinnerDiv).toBeInTheDocument();
    expect(loaderSpan).toBeInTheDocument();
  });
});
