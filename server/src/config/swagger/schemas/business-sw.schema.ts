export const ContactSchema = {
  type: "object",
  required: ["contact_person", "phone_number", "email"],
  properties: {
    contact_person: { type: "string", description: "Contact person name" },
    phone_number: { type: "string", description: "Phone number" },
    email: { type: "string", description: "Email address" },
  },
};

export const BusinessSchema = {
  type: "object",
  required: ["user_id", "name", "category", "address", "contacts", "images_url", "price"],
  properties: {
    id: { type: "string", description: "The auto-generated id of the business" },
    user_id: { type: "string", description: "The id of the user who owns the business" },
    name: { type: "string", description: "Business name", minLength: 3 },
    description: { type: "string", description: "Business description", default: "" },
    category: { type: "string", description: "Business category" },
    provider: { type: "string", description: "Provider title" },
    address: { type: "string", description: "Business address" },
    contacts: {
      type: "array",
      items: { $ref: "#/components/schemas/Contact" },
      description: "Contact information",
    },
    images_url: { type: "string", description: "URL of the business images" },
    price: { type: "number", description: "Price of the business" },
    created_at: { type: "string", format: "date-time", description: "Creation timestamp" },
    updated_at: { type: "string", format: "date-time", description: "Update timestamp" },
  },
};
