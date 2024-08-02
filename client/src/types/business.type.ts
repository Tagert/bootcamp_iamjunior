import { ContactType } from "./contact.type";

export type DayWorkingHours = {
  open?: string;
  close?: string;
  status: "open" | "closed";
};

export type WorkingHoursType = {
  monday: DayWorkingHours;
  tuesday: DayWorkingHours;
  wednesday: DayWorkingHours;
  thursday: DayWorkingHours;
  friday: DayWorkingHours;
  saturday: DayWorkingHours;
  sunday: DayWorkingHours;
};

export type ImagesType = {
  id?: string;
  url: string;
  alt_text: string;
};

export type BusinessType = {
  id?: string;
  user_id?: string;
  name: string;
  description: string;
  category: string;
  provider: string;
  address: string;
  contacts: ContactType[];
  images_url: ImagesType[];
  price: number;
  working_hours: WorkingHoursType;
  favorite_count?: number;
};
