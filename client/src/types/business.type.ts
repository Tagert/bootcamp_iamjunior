import { ContactType } from "./contact.type";

export type BusinessType = {
  id?: string;
  user_id?: string;
  name: string;
  description: string;
  category: string;
  address: string;
  contacts: ContactType[];
  images_url: string;
  price: number;
};
