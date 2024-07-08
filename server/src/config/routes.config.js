import { categoryRoutes } from "../routes/category.routes.js";
import { bookingRoutes } from "../routes/booking.routes.js";
import { businessRoutes } from "../routes/business.routes.js";
import { userRoutes } from "../routes/user.routes.js";

export const configRoutes = (app) => {
  app.use(categoryRoutes);
  app.use(bookingRoutes);
  app.use(businessRoutes);
  app.use(userRoutes);

  app.use((req, res) => {
    return res.status(404).json({ status: "Endpoint does not exist" });
  });
};
