import truck from "../assets/truck.png";
import repair from "../assets/repair.png";
import plumbing from "../assets/plumbing.png";
import cleaning from "../assets/cleaning.png";
import painting from "../assets/painting.png";
import electric from "../assets/electric.png";
import { CategoriesType } from "../types/categories.types";

export const categories: CategoriesType[] = [
  {
    imgSrc: cleaning,
    text: "Cleaning",
  },

  { imgSrc: repair, text: "Repair" },

  {
    imgSrc: painting,
    text: "Painting",
  },

  {
    imgSrc: truck,
    text: "Shifting",
  },

  {
    imgSrc: plumbing,
    text: "Plumbing",
  },

  { imgSrc: electric, text: "Electric" },
];
