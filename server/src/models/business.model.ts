import mongoose from "mongoose";

type ContactType = {
  contact_person: string;
  phone_number: string;
  email: string;
};

type BusinessBody = {
  user_id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  contacts: ContactType[];
  images_url: string;
  price: number;
};

type BusinessType = BusinessBody & Entity;

const contactSchema = new mongoose.Schema<ContactType>({
  contact_person: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
});

const businessSchema = new mongoose.Schema<BusinessType>(
  {
    id: { type: String, required: true },
    user_id: { type: String, required: true },
    name: { type: String, required: true, min: 3 },
    description: { type: String, required: false, default: "" },
    category: { type: String, required: true },
    address: { type: String, required: true },
    contacts: { type: [contactSchema], required: true },
    images_url: { type: String, required: true },
    price: { type: Number, required: true },
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
