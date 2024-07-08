import express from "express";
import {
  GET_ALL_USER_BOOKINGS,
  INSERT_BOOKING,
  GET_BUSINESS_ID_BOOKING_BY_DATE,
  DELETE_BOOKING_BY_ID,
} from "../controllers/booking.controller.js";
import { userAuth } from "../middleware/user-auth.js";

export const bookingRoutes = express.Router();

bookingRoutes.get("/bookings/user/:email", GET_ALL_USER_BOOKINGS);

bookingRoutes.post("/business/:business_id/booking", userAuth, INSERT_BOOKING);

bookingRoutes.get("/business/:id/bookings/date/:date", GET_BUSINESS_ID_BOOKING_BY_DATE);

bookingRoutes.delete("/booking/:id", userAuth, DELETE_BOOKING_BY_ID);
