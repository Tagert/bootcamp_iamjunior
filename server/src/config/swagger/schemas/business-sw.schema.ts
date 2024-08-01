export const DayWorkingHoursSchema = {
  type: "object",
  properties: {
    open: { type: "string", description: "Opening time, e.g., '09:00'", nullable: true },
    close: { type: "string", description: "Closing time, e.g., '17:00'", nullable: true },
    status: { type: "string", enum: ["open", "closed"], description: "Status for the day" },
  },
};

export const WorkingHoursSchema = {
  type: "object",
  properties: {
    monday: { $ref: "#/components/schemas/DayWorkingHours", description: "Working hours for Monday" },
    tuesday: { $ref: "#/components/schemas/DayWorkingHours", description: "Working hours for Tuesday" },
    wednesday: { $ref: "#/components/schemas/DayWorkingHours", description: "Working hours for Wednesday" },
    thursday: { $ref: "#/components/schemas/DayWorkingHours", description: "Working hours for Thursday" },
    friday: { $ref: "#/components/schemas/DayWorkingHours", description: "Working hours for Friday" },
    saturday: { $ref: "#/components/schemas/DayWorkingHours", description: "Working hours for Saturday" },
    sunday: { $ref: "#/components/schemas/DayWorkingHours", description: "Working hours for Sunday" },
  },
};

export const ContactSchema = {
  type: "object",
  required: ["contact_person", "phone_number", "email"],
  properties: {
    contact_person: { type: "string", description: "Contact person name" },
    phone_number: { type: "string", description: "Phone number" },
    email: { type: "string", description: "Email address" },
  },
};

export const ImagesSchema = {
  type: "object",
  required: ["url"],
  properties: {
    url: { type: "string", description: "Image url" },
    alt_text: { type: "string", description: "Short image description" },
  },
};

export const BusinessSchema = {
  type: "object",
  required: ["name", "category", "address", "contacts", "images_url", "price", "working_hours"],
  properties: {
    id: { type: "string", description: "The auto-generated id of the business" },
    user_id: { type: "string", description: "The id of the user who owns the business" },
    name: { type: "string", description: "Business name", minLength: 3 },
    description: { type: "string", description: "Business description", default: "" },
    category: { type: "string", description: "Business category" },
    provider: { type: "string", description: "Provider title" },
    address: { type: "string", description: "Business address" },
    contacts: {
      type: "object",
      $ref: "#/components/schemas/Contact",
      description: "Contact information",
    },
    images_url: {
      type: "object",
      $ref: "#/components/schemas/Images",
      description: "URL of the business images",
    },
    price: { type: "number", description: "Price of the business" },
    working_hours: {
      type: "object",
      $ref: "#/components/schemas/WorkingHoursStructure",
      description: "Working hours by day",
    },
    favorite_count: { type: "number", description: "Count number of users favored businesses" },
    created_at: { type: "string", format: "date-time", description: "Creation timestamp" },
    updated_at: { type: "string", format: "date-time", description: "Update timestamp" },
  },
};
