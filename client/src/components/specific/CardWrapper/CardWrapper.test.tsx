import { render, screen } from "@testing-library/react";
import { CardWrapper } from "./CardWrapper";
import { BusinessType } from "../../../types/business.type";

jest.mock("../Card/Card", () => ({
  Card: ({ name, category }: { name: string; category: string }) => (
    <div>
      <h2>{name}</h2>
      <p>{category}</p>
    </div>
  ),
}));

describe("CardWrapper", () => {
  const businesses: BusinessType[] = [
    {
      id: "1",
      user_id: "user1",
      name: "Business One",
      description: "Description One",
      category: "Category One",
      provider: "Provider One",
      address: "Address One",
      contacts: [],
      images_url: [],
      price: 10,
      working_hours: {
        monday: {
          open: "8:00",
          close: "17:00",
          status: "open",
        },
        tuesday: {
          open: "8:00",
          close: "17:00",
          status: "open",
        },
        wednesday: {
          open: "8:00",
          close: "17:00",
          status: "open",
        },
        thursday: {
          open: "8:00",
          close: "17:00",
          status: "open",
        },
        friday: {
          open: "8:00",
          close: "17:00",
          status: "open",
        },
        saturday: {
          status: "closed",
        },
        sunday: {
          status: "closed",
        },
      },
    },
    {
      id: "2",
      user_id: "user2",
      name: "Business Two",
      description: "Description Two",
      category: "Category Two",
      provider: "Provider Two",
      address: "Address Two",
      contacts: [],
      images_url: [],
      price: 20,
      working_hours: {
        monday: {
          open: "8:00",
          close: "17:00",
          status: "open",
        },
        tuesday: {
          open: "8:00",
          close: "17:00",
          status: "open",
        },
        wednesday: {
          open: "8:00",
          close: "17:00",
          status: "open",
        },
        thursday: {
          open: "8:00",
          close: "17:00",
          status: "open",
        },
        friday: {
          open: "8:00",
          close: "17:00",
          status: "open",
        },
        saturday: {
          status: "closed",
        },
        sunday: {
          status: "closed",
        },
      },
    },
  ];

  test("renders businesses correctly", () => {
    render(<CardWrapper businesses={businesses} />);

    expect(screen.getByText("Business One")).toBeInTheDocument();
    expect(screen.getByText("Category One")).toBeInTheDocument();
    expect(screen.getByText("Business Two")).toBeInTheDocument();
    expect(screen.getByText("Category Two")).toBeInTheDocument();
  });

  test("filters businesses by category", () => {
    render(<CardWrapper businesses={businesses} category="Category One" />);

    expect(screen.getByText("Business One")).toBeInTheDocument();
    expect(screen.queryByText("Business Two")).not.toBeInTheDocument();
  });

  test("shows message when no businesses are provided", () => {
    render(<CardWrapper businesses={[]} />);

    expect(
      screen.getByText("There is no businesses in this category")
    ).toBeInTheDocument();
  });

  test("shows message when filtered category has no businesses", () => {
    render(
      <CardWrapper businesses={businesses} category="Non-existent Category" />
    );

    expect(
      screen.getByText("There is no businesses in this category")
    ).toBeInTheDocument();
  });

  test("shows error message when there is an error", () => {
    const error = new Error("Something went wrong");
    render(<CardWrapper error={error} />);

    expect(screen.getByText(`Error: ${error.message}`)).toBeInTheDocument();
  });
});
