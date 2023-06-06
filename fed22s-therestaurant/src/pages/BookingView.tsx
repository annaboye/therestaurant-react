import { IBooking } from "../models/IBooking";
import { useContext, useEffect, useState } from "react";

import { BookingContext } from "../contexts/BookingContext";
import { getBookingById } from "../services/getBookingById";
import { useParams } from "react-router";

export const BookingView = ({ bookingId }: { bookingId: string }) => {
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const fetchedBooking = await getBookingById(bookingId);
        setBooking(fetchedBooking);
      } catch (error) {
        console.error("Error fetching booking:", error);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (!booking) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Booking Details</h1>
      <p>ID: {booking.id}</p>
      <p>Date: {booking.date}</p>
      <p>Time: {booking.time}</p>
      <p>Amount of Persons: {booking.amountOfPersons}</p>
      <p>Guest Name: {booking.guest.name}</p>
      <p>Guest Email: {booking.guest.email}</p>
      <p>Guest Mobile: {booking.guest.mobile}</p>
    </div>
  );
};
