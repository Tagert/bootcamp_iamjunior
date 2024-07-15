import mongoose from "mongoose";

type CategoryBody = {
  name: string;
  color: string;
  icon_url: string;
};

type CategoryType = CategoryBody & Entity;

const categorySchema = new mongoose.Schema<CategoryType>(
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

categorySchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

export const CategoryModel = mongoose.model<CategoryType>("categories", categorySchema);
