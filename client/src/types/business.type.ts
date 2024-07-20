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

export type BusinessType = {
  id?: string;
  user_id?: string;
  name: string;
  description: string;
  category: string;
  provider: string;
  address: string;
  contacts: ContactType[];
  images_url: string;
  price: number;
  working_hours: WorkingHoursType;
};
