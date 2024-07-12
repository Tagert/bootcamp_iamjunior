export const CategorySchema = {
  type: "object",
  required: ["name", "icon_url"],
  properties: {
    id: { type: "string", description: "The auto-generated id of the category" },
    name: { type: "string", description: "Category name" },
    color: { type: "string", description: "Category color (optional)", default: "#000000" },
    icon_url: { type: "string", description: "URL to the category icon" },
    created_at: { type: "string", format: "date-time", description: "Creation timestamp" },
    updated_at: { type: "string", format: "date-time", description: "Update timestamp" },
  },
};
