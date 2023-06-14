import axios from "axios";
import { IBooking } from "../models/IBooking";

export const createBooking = async (booking: IBooking) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/bookings",
      booking
    );
    const createdBookingId = response.data;
    console.log(response.data);
    return createdBookingId;
  } catch {
    throw new Error("Could not create booking");
  }
};
