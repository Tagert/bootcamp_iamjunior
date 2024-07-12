import type { Express } from "express";
import { categoryRoutes } from "../routes/category.routes";
import { bookingRoutes } from "../routes/booking.routes";
import { businessRoutes } from "../routes/business.routes";
import { userRoutes } from "../routes/user.routes";

export const configRoutes = (app: Express) => {
  app.use(categoryRoutes);
  app.use(bookingRoutes);
  app.use(businessRoutes);
  app.use(userRoutes);

  app.use((req, res) => {
    return res.status(404).json({ status: "Endpoint does not exist" });
  });
};
