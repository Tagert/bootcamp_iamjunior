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
    email: {
      type: "string",
      description: "User email",
    },
    password: {
      type: "string",
      description: "User password",
    },
    role: {
      type: "string",
      description: "User role",
    },
    favorites: {
      type: "array",
      items: {
        type: "string",
      },
      description: "List of user's favorite business IDs",
    },
  },
};
