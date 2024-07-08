import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    color: { type: String, required: false, default: "#000000" },
    icon_url: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    versionKey: false,
  },
);

export const CategoryModel = mongoose.model("categories", categorySchema);
