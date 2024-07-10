import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { config } from "../load-env.config.js";
import { UserSchema } from "./schemas/user-sw.schema.js";
import { BusinessSchema } from "./schemas/business-sw.schema.js";
import { ContactSchema } from "./schemas/business-sw.schema.js";
import { BookingSchema } from "./schemas/booking-sw.schema.js";
import { CategorySchema } from "./schemas/category-sw.schema.js";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Find Service",
      version: "0.0.1",
      description: "API documentation",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: UserSchema,
        Business: BusinessSchema,
        Contact: ContactSchema,
        Booking: BookingSchema,
        Category: CategorySchema,
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: `http://localhost:${config.server.port}`,
        description: "Development server",
      },
    ],
  },
  apis: ["./src/config/**/*.js"],
};

export const configSwagger = (app) => {
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
