import mongoose from "mongoose";

type UserBody = {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  phone_number: string;
  contact_email: string;
  city: string;
  address: string;
  birthday: Date;
  role: string;
  favorites: [string];
};

type UserType = UserBody & Entity;

type UserModel = mongoose.Model<UserType>;

const userSchema = new mongoose.Schema<UserType>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: false },
    phone_number: { type: String, required: false },
    contact_email: { type: String, required: false },
    city: { type: String, required: false },
    address: { type: String, required: false },
    birthday: { type: Date, required: false },
    role: { type: String, required: true, default: "user" },
    favorites: { type: [String], required: false, default: [] },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    versionKey: false,
  },
);

userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

export const UserModel = mongoose.model<UserType>("users", userSchema);
