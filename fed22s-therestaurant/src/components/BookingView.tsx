import { IBooking } from "../models/IBooking";
import { useContext, useEffect, useState } from "react";

import { getBookingById } from "../services/getBookingById";

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
      <h1>Bokningsdetaljer</h1>
      <p>ID: {booking._id}</p>
      <p>Datum: {booking.date}</p>
      <p>Tid: {booking.time}</p>
      <p>Antal personer: {booking.amountOfPersons}</p>
      <p>Namn: {booking.guest.name}</p>
      <p>Mail: {booking.guest.email}</p>
      <p>Telefonnummer: {booking.guest.mobile}</p>
      <p>Meddelande: {booking.description}</p>
      <button>Ta bort bokning</button>
    </div>
  );
};
