import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";
import { config } from "../load-env.config";
import { UserSchema } from "./schemas/user-sw.schema";
import { BusinessSchema } from "./schemas/business-sw.schema";
import { ContactSchema } from "./schemas/business-sw.schema";
import { BookingSchema } from "./schemas/booking-sw.schema";
import { CategorySchema } from "./schemas/category-sw.schema";

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
  apis: ["./src/config/**/*.ts"],
};

export const configSwagger = (app: Express) => {
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
