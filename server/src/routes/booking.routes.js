import express from "express";

export const bookingRoutes = express.Router();

bookingRoutes.get("/bookings/user/:email");

bookingRoutes.post("/bookings");

bookingRoutes.get("/businesses/:businessId/bookings/date/:date");

bookingRoutes.delete("/bookings/:id");
