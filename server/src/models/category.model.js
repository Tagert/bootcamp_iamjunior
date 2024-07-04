import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  color: { type: String, required: false, default: "#000000" },
  icon_url: { type: String, required: true },
});

export const CategoryModel = mongoose.model("categories", categorySchema);
