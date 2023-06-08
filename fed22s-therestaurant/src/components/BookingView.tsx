import { IBooking } from "../models/IBooking";
import { useContext, useEffect, useState } from "react";

import { getBookingById } from "../services/getBookingById";
import { deleteBooking } from "../services/deleteBooking";
import {
  BookingContext,
  BookingDispatchContext,
} from "../contexts/BookingContext";
import { ActionType } from "../reducers/BookingsReducer";

interface IBookingProps {
  booking: IBooking | undefined;
}

export const BookingView = ({ booking }: IBookingProps) => {
  const dispatch = useContext(BookingDispatchContext);
  const deleteThisBooking = (bookingId: string) => {
    deleteBooking(bookingId);
    dispatch({ type: ActionType.REMOVE, payload: bookingId.toString() });
  };

  if (!booking) {
    return <div>Bokning hittades inte!</div>;
  } else {
    return (
      <div>
        <h3>ID: {booking._id}</h3>
        <p>Datum: {new Date(booking.date).toLocaleDateString("sv-SE")}</p>
        <p>Tid: {booking.time}</p>
        <p>Antal personer: {booking.amountOfPersons}</p>
        <p>Namn: {booking.guest.name}</p>
        <p>Mail: {booking.guest.email}</p>
        <p>Telefonnummer: {booking.guest.mobile}</p>
        <p>Meddelande: {booking.description}</p>
        <button
          onClick={() => {
            deleteThisBooking(booking._id);
          }}
        >
          Ta bort bokning
        </button>
      </div>
    );
  }
};
