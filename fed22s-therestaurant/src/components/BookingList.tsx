import { useEffect, useState } from "react";
import { IBooking } from "../models/IBooking";
import { getBookings } from "../services/getBookings";
import { BookingView } from "./BookingView";

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
            <BookingView booking={booking}></BookingView>
          </li>
        ))}
      </ul>
    </div>
  );
};
