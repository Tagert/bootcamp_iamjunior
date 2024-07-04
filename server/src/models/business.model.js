import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  contact_person: { type: String, required: true },
  email: { type: String, required: true },
});

const businessSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true, min: 3 },
  description: { type: String, required: false, default: "" },
  category: { type: String, required: true },
  address: { type: String, required: true },
  contacts: { type: [contactSchema], required: true },
  images_url: { type: String, required: true },
  price: { type: Number, required: true },
});

export const BusinessModel = mongoose.model("businesses", businessSchema);
