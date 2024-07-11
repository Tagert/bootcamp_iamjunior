import truck from "../assets/truck.png";
import repair from "../assets/repair.png";
import plumbing from "../assets/plumbing.png";
import cleaning from "../assets/cleaning.png";
import painting from "../assets/painting.png";
import electric from "../assets/electric.png";

export type CategoryName =
  | "truck"
  | "repair"
  | "plumbing"
  | "cleaning"
  | "painting"
  | "electric";

export type CategoryType = {
  id?: string;
  name: string;
  color?: string;
  icon_url: string;
};
