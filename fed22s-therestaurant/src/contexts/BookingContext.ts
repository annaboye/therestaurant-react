import { Dispatch, createContext } from "react";
import { IBooking } from "../models/IBooking";
import { IAction } from "../reducers/BookingsReducer";

export const BookingContext = createContext<IBooking[]>([]);

export const BookingDispatchContext = createContext<Dispatch<IAction>>(() => {
  return;
});
