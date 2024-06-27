import truck from "../assets/truck.png";
import repair from "../assets/repair.png";
import plumbing from "../assets/plumbing.png";
import cleaning from "../assets/cleaning.png";
import painting from "../assets/painting.png";
import electric from "../assets/electric.png";
import { CategoriesType } from "../types/categories.types";

export const categories: CategoriesType[] = [
  {
    id: 1,
    imgSrc: cleaning,
    text: "Cleaning",
  },

  { id: 2, imgSrc: repair, text: "Repair" },

  {
    id: 3,
    imgSrc: painting,
    text: "Painting",
  },

  {
    id: 4,
    imgSrc: truck,
    text: "Shifting",
  },

  {
    id: 5,
    imgSrc: plumbing,
    text: "Plumbing",
  },

  { id: 6, imgSrc: electric, text: "Electric" },
];
