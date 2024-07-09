export const BookingSchema = {
  type: "object",
  required: ["business_id", "booking_date", "time", "user_id", "user_name", "user_email", "status"],
  properties: {
    id: { type: "string", description: "The auto-generated id of the booking" },
    business_id: { type: "string", description: "The id of the business" },
    booking_date: { type: "string", format: "date", description: "The date of the booking" },
    time: { type: "string", description: "The time of the booking" },
    user_id: { type: "string", description: "The id of the user" },
    user_name: { type: "string", description: "The name of the user" },
    user_email: { type: "string", description: "The email of the user" },
    status: { type: "string", description: "The status of the booking", default: "pending" },
    created_at: { type: "string", format: "date-time", description: "Creation timestamp" },
    updated_at: { type: "string", format: "date-time", description: "Update timestamp" },
  },
};
