import { IBooking } from "../models/IBooking";
import { useContext, useEffect, useState } from "react";

import { deleteBooking } from "../services/deleteBooking";
import { BookingDispatchContext } from "../contexts/BookingContext";
import { ActionType } from "../reducers/BookingsReducer";
import "./Bookingview.scss";

interface IBookingProps {
  booking: IBooking;
}

export const BookingView = ({ booking }: IBookingProps) => {
  const dispatch = useContext(BookingDispatchContext);
  const [deleted, setDeleted] = useState(false);
  const deleteThisBooking = (bookingId: string) => {
    deleteBooking(bookingId);
    dispatch({ type: ActionType.REMOVE, payload: bookingId as string });
    setDeleted(true);
  };

  if (deleted) {
    return <div>Bokning raderades!</div>;
  }
  if (booking) {
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
          className="delete-button"
          onClick={() => {
            if (booking && booking._id) deleteThisBooking(booking._id);
          }}
        >
          Ta bort bokning
        </button>
      </div>
    );
  } else {
    return <div>Bokning hittades inte!</div>;
  }
};
