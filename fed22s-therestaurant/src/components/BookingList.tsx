import { useEffect, useState } from "react";
import { IBooking } from "../models/IBooking";
import { getBookings } from "../services/getBookings";

export const BookingList = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsData = await getBookings();
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Bokningar</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            <p>ID: {booking._id}</p>
            <p>Datum: {new Date(booking.date).toLocaleDateString("sv-SE")}</p>
            <p>Tid: {booking.time}</p>
            <p>Antal personer: {booking.amountOfPersons}</p>
            <p>Namn: {booking.guest.name}</p>
            <p>Mail: {booking.guest.email}</p>
            <p>Telefonnummer: {booking.guest.mobile}</p>
            <p>Meddelande: {booking.description}</p>
            <button>Ta bort bokning</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
