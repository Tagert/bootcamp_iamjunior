import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
  contact_person: { type: String, required: true },
  phone_number: { type: String, required: true },
  email: { type: String, required: true },
});

const businessSchema = mongoose.Schema(
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

export const BusinessModel = mongoose.model("businesses", businessSchema);
