export const UserSchema = {
  type: "object",
  required: ["name", "email", "password"],
  properties: {
    id: {
      type: "string",
      description: "The auto-generated id of the user",
    },
    name: {
      type: "string",
      description: "User name",
    },
    age: {
      type: "number",
      description: "User age",
    },
    email: {
      type: "string",
      description: "User email and login info",
    },
    password: {
      type: "string",
      description: "User password",
    },
    gender: {
      type: "string",
      description: "User gender",
    },
    phone_number: {
      type: "string",
      description: "User phone number",
    },
    contact_email: {
      type: "string",
      description: "Alternative contact email",
    },
    city: {
      type: "string",
      description: "User city",
    },
    address: {
      type: "string",
      description: "User address",
    },
    birthday: {
      type: "string",
      format: "date",
      description: "User birthday",
    },
    role: {
      type: "string",
      description: "User role",
      default: "user",
    },
    favorites: {
      type: "array",
      items: {
        type: "string",
      },
      description: "List of user's favorite business IDs",
    },
    created_at: {
      type: "string",
      format: "date-time",
      description: "Timestamp when the user was created",
    },
    updated_at: {
      type: "string",
      format: "date-time",
      description: "Timestamp when the user was last updated",
    },
  },
};
