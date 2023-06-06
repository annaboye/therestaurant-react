import { IBooking } from "../models/IBooking";
import { useContext, useEffect, useState } from "react";

import { BookingContext } from "../contexts/BookingContext";
import { getBookingById } from "../services/getBookingById";
import { useParams } from "react-router";

interface BookingWithId extends IBooking {
  id: string;
}

export const BookingView = () => {
  const { id } = useParams();
  const { bookings } = useContext(BookingContext);
  const [booking, setBooking] = useState<BookingWithId | null>(null);

  useEffect(() => {
    const foundBooking = bookings.find(
      (booking) => booking.id === id
    ) as BookingWithId;
    setBooking(foundBooking || null);
  }, [bookings, id]);

  return (
    <div>
      <h1>Booking View</h1>
      {booking ? (
        <div>
          <p>ID: {booking.id}</p>
          <p>Date: {booking.date}</p>
          <p>Time: {booking.time}</p>
          <p>Amount of Persons: {booking.amountOfPersons}</p>
          <p>Guest Name: {booking.guest.name}</p>
          <p>Guest Email: {booking.guest.email}</p>
          <p>Guest Mobile: {booking.guest.mobile}</p>
        </div>
      ) : (
        <p>Loading booking...</p>
      )}
    </div>
  );
};
