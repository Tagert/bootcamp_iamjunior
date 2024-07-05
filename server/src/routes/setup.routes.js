import { categoryRoutes } from "./category.routes.js";
import { bookingRoutes } from "./booking.routes.js";
import { businessRoutes } from "./business.routes.js";
import { userRoutes } from "./user.routes.js";

export const setupRoutes = (app) => {
  app.use(categoryRoutes);
  app.use(bookingRoutes);
  app.use(businessRoutes);
  app.use(userRoutes);

  app.use((req, res) => {
    return res.status(404).json({ status: "Endpoint does not exist" });
  });
};
