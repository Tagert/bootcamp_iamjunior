import express from "express";
import { GET_ALL_USER_BOOKINGS, INSERT_BOOKING } from "../controllers/booking.controller";

export const bookingRoutes = express.Router();

bookingRoutes.get("/bookings/user/:email", GET_ALL_USER_BOOKINGS);

bookingRoutes.post("/booking", INSERT_BOOKING);

bookingRoutes.get("/businesses/:businessId/bookings/date/:date");

bookingRoutes.delete("/booking/:id");
