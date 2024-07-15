import mongoose from "mongoose";

type BookingBody = {
  business_id: string;
  booking_date: Date;
  time: string;
  user_id: string;
  user_name: string;
  user_email: string;
  status: string;
};

export type BookingType = BookingBody & Entity;

const bookingSchema = new mongoose.Schema<BookingType>(
  {
    id: { type: String, required: true },
    business_id: { type: String, required: true },
    booking_date: { type: Date, required: true },
    time: { type: String, required: true },
    user_id: { type: String, required: true },
    user_name: { type: String, required: true },
    user_email: { type: String, required: true },
    status: { type: String, required: true, default: "pending" },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    versionKey: false,
  },
);

bookingSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

export const BookingModel = mongoose.model<BookingType>("bookings", bookingSchema);
