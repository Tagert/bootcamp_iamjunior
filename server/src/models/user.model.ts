import mongoose from "mongoose";

type UserBody = {
  name: string;
  age: number;
  email: string;
  password: string;
  role: string;
};

type UserType = UserBody & Entity;

type UserModel = mongoose.Model<UserType>;

const userSchema = new mongoose.Schema<UserType>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
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