import axios from "axios";
import { IBooking } from "../models/IBooking";


const get = async <T>(url: string) => {
  return await axios.get<T>(url);
};

export const getBookingsByDate = async (date: string) => {
  try {
    const response = await get<IBooking[]>(
      `http://localhost:4000/api/v1/bookings?date=${date}`
    );
    if (response) {
      return response.data;
    } else {
      return [];
    }
  } catch {
    throw new Error("Could not get data from api");
  }
};
