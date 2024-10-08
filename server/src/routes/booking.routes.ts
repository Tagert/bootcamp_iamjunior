import express from "express";
import {
  GET_ALL_USER_BOOKINGS,
  GET_BOOKINGS_BY_BUSINESS,
  INSERT_BOOKING,
  GET_BUSINESS_ID_BOOKINGS_BY_DATE,
  DELETE_BOOKING_BY_ID,
} from "../controllers/booking/index.js";
import { userAuth } from "../middleware/user-auth.js";

export const bookingRoutes = express.Router();

bookingRoutes.get("/bookings/user/:id", userAuth, GET_ALL_USER_BOOKINGS);

bookingRoutes.get("/bookings/business/:id", userAuth, GET_BOOKINGS_BY_BUSINESS);

bookingRoutes.post("/business/:business_id/booking", userAuth, INSERT_BOOKING);

bookingRoutes.get("/business/:id/bookings/date/:date", GET_BUSINESS_ID_BOOKINGS_BY_DATE);

bookingRoutes.delete("/booking/:id", userAuth, DELETE_BOOKING_BY_ID);
