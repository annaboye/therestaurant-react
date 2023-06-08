import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { IBooking } from "../models/IBooking";
import { getBookings } from "../services/getBookings";
import { BookingView } from "./BookingView";
import { BookingContext } from "../contexts/BookingContext";

export const BookingList = () => {
  const bookings = useContext(BookingContext);

  const [userInputDate, setUserInputDate] = useState("");

  const handleDates = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInputDate(e.target.value);
  };

  const handleSubmitDates = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Bokningar</h2>
      <div className="form-group">
        <form onSubmit={handleSubmitDates}></form>
        <label htmlFor="date"> Välj datum:</label>
        <input
          type="date"
          value={userInputDate}
          onChange={handleDates}
          name="date"
          required
        />
      </div>
      <input type="radio" name="date" />
      18:00
      <input type="radio" name="date" />
      21:00
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
