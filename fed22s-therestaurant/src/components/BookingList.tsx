import { useContext, useEffect, useState } from "react";
import { IBooking } from "../models/IBooking";
import { getBookings } from "../services/getBookings";
import { BookingView } from "./BookingView";
import { BookingContext } from "../contexts/BookingContext";

export const BookingList = () => {
  const bookings = useContext(BookingContext);


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
