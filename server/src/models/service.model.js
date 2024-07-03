import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
  id: { type: String, required: true },
  imgUrl: { type: String, required: true },
  category: { type: String, required: true, min: 3 },
  title: { type: String, required: true, min: 3 },
  provider: { type: String, required: true, min: 3 },
  address: { type: String, required: true, min: 3 },
  price: { type: Number, required: true },
});

export const ServicesModel = mongoose.model("services", serviceSchema);
