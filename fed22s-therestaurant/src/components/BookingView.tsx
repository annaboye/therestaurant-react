import { IBooking } from "../models/IBooking";
import { useContext, useEffect, useState } from "react";

import { getBookingById } from "../services/getBookingById";
import { deleteBooking } from "../services/deleteBooking";

interface IBookingProps {
  booking: IBooking | undefined;
}

export const BookingView = ({ booking }: IBookingProps) => {
  const deleteThisBooking = (bookingId: string | undefined) => {
    deleteBooking(bookingId);
  };

  if (!booking) {
    return <div>Bokning hittades inte!</div>;
  } else {
    return (
      <div>
        <h1>Bokningsdetaljer</h1>
        <p>ID: {booking._id}</p>
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
