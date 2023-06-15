import axios from "../../node_modules/axios/index";
import { IBooking } from "../models/IBooking";

const get = async <T>(url: string) => {
  return await axios.get<T>(url);
};

export const getBookings = async () => {
  try {
    const response = await get<IBooking[]>(
      "http://localhost:4000/api/v1/bookings"
    );

    return response.data;
  } catch {
    throw new Error("Could not get data from api");
  }
};
