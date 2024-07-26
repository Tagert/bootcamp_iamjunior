import { render, fireEvent } from "@testing-library/react";
import { Card } from "./Card";
import { routes } from "../../../routes/routes";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { ImagesType } from "../../../types/business.type";
import { ContactType } from "../../../types/contact.type";
import { CardProp } from "./Card";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../../hooks/useLocalStorage", () => ({
  useLocalStorage: jest.fn(),
}));

describe("Card", () => {
  const images_url: ImagesType[] = [
    {
      url: "https://example.com/image.jpg",
      alt_text: "Image alt text",
    },
  ];

  const contacts: ContactType[] = [
    {
      contact_person: "person",
      phone_number: "phone",
      email: "email",
    },
  ];

  const props: CardProp = {
    id: "123",
    user_id: "456",
    name: "Business Name",
    description: "description test",
    category: "Category",
    provider: "Provider",
    address: "Address",
    contacts,
    images_url,
    price: 10,
  };

  const setFavoritesIdMock = jest.fn();
  const navigateMock = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
    (useLocalStorage as jest.Mock).mockReturnValue([[], setFavoritesIdMock]);
    (useNavigate as jest.Mock).mockClear();
    setFavoritesIdMock.mockClear();
  });

  test("renders the card with the correct information", () => {
    const { getByText } = render(<Card {...props} />);
    expect(getByText(props.name)).toBeInTheDocument();
    expect(getByText(props.category)).toBeInTheDocument();
    expect(getByText(props.provider)).toBeInTheDocument();
    expect(getByText(props.address)).toBeInTheDocument();
    expect(getByText(`from ${props.price} €`)).toBeInTheDocument();
  });

  test("navigates to the business ID page when the book button is clicked", () => {
    const { getByText } = render(<Card {...props} />);
    const bookButton = getByText("Book Now");
    fireEvent.click(bookButton);
    expect(navigateMock).toHaveBeenCalledTimes(1);
    expect(navigateMock).toHaveBeenCalledWith(
      `/${routes.BUSINESS_ID.url(props.id).toLocaleLowerCase()}`
    );
  });
});
