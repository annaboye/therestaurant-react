import { useContext, useEffect, useState } from "react";
import { IBooking } from "../models/IBooking";
import { getBookings } from "../services/getBookings";
import { BookingView } from "./BookingView";
import { BookingContext } from "../contexts/BookingContext";

export const BookingList = () => {
  const bookings = useContext(BookingContext);

  // useEffect(() => {
  //   const fetchBookings = async () => {
  //     try {
  //       const bookingsData = await getBookings();
  //       setBookings(bookingsData);
  //     } catch (error) {
  //       console.error("Error fetching bookings:", error);
  //     }
  //   };

  //   fetchBookings();
  // }, []);

  return (
    <div>
      <h2>Bokningar</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            <BookingView booking={booking} key={booking._id}></BookingView>
          </li>
        ))}
      </ul>
    </div>
  );
};
