import mongoose from "mongoose";

type ContactType = {
  contact_person: string;
  phone_number: string;
  email: string;
};

type ImagesType = {
  url: string;
  alt_text: string;
};

type DayWorkingHours = {
  open?: string;
  close?: string;
  status: "open" | "closed";
};

type BusinessBody = {
  user_id: string;
  name: string;
  description: string;
  category: string;
  provider: string;
  address: string;
  contacts: ContactType[];
  images_url: ImagesType[];
  price: number;
  working_hours: {
    monday: DayWorkingHours;
    tuesday: DayWorkingHours;
    wednesday: DayWorkingHours;
    thursday: DayWorkingHours;
    friday: DayWorkingHours;
    saturday: DayWorkingHours;
    sunday: DayWorkingHours;
  };
  favorite_count: number;
};

type BusinessType = BusinessBody & Entity;

const contactSchema = new mongoose.Schema<ContactType>({
  contact_person: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
});

const dayWorkingHoursSchema = new mongoose.Schema({
  open: { type: String, required: false },
  close: { type: String, required: false },
  status: { type: String, enum: ["open", "closed"], required: true },
});

const imagesSchema = new mongoose.Schema({
  url: { type: String, required: true },
  alt_text: { type: String, required: false },
});

const businessSchema = new mongoose.Schema<BusinessType>(
  {
    id: { type: String, required: true },
    user_id: { type: String, required: true },
    name: { type: String, required: true, min: 3 },
    description: { type: String, required: false, default: "" },
    category: { type: String, required: true },
    provider: { type: String, required: true },
    address: { type: String, required: true },
    contacts: { type: [contactSchema], required: true },
    images_url: { type: [imagesSchema], required: true },
    price: { type: Number, required: true },
    working_hours: {
      monday: { type: dayWorkingHoursSchema, required: true },
      tuesday: { type: dayWorkingHoursSchema, required: true },
      wednesday: { type: dayWorkingHoursSchema, required: true },
      thursday: { type: dayWorkingHoursSchema, required: true },
      friday: { type: dayWorkingHoursSchema, required: true },
      saturday: { type: dayWorkingHoursSchema, required: true },
      sunday: { type: dayWorkingHoursSchema, required: true },
    },
    favorite_count: { type: Number, required: false, default: 0 },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    versionKey: false,
  },
);

businessSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

export const BusinessModel = mongoose.model<BusinessType>("businesses", businessSchema);
