import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { IBooking } from "../models/IBooking";
import { getBookings } from "../services/getBookings";
import { BookingView } from "./BookingView";
import {
  BookingContext,
  BookingDispatchContext,
} from "../contexts/BookingContext";
import { ActionType } from "../reducers/BookingsReducer";

export const BookingList = () => {
  const bookings = useContext(BookingContext);
  const dispatch = useContext(BookingDispatchContext);
  const [bookingsToView, setBookingsToView] = useState(bookings);

  const [userInput, setUserInput] = useState({ date: "", time: "" });

  const handleChangeOne = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setUserInput({ ...userInput, [name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setBookingsToView(
      bookings.filter(
        (booking) =>
          booking.date === userInput.date && booking.time === userInput.time
      )
    );
  };

  return (
    <>
      <div className="form-wrapper">
        <h2>Bokningar</h2>
        <div className="form-group">
          <form onSubmit={handleSubmit}>
            <label htmlFor="date"> Välj datum:</label>
            <input
              type="date"
              value={userInput.date}
              onChange={handleChangeOne}
              name="date"
              required
            />
            <input
              type="radio"
              name="time"
              value={"18:00"}
              onChange={handleChangeOne}
            />
            18:00
            <input
              type="radio"
              name="time"
              value={"21:00"}
              onChange={handleChangeOne}
            />
            21:00
            <button>Sök</button>
          </form>
        </div>
        <div className="list-wrapper">
          <ul>
            {bookingsToView.map((bookingToView) => (
              <li key={bookingToView._id}>
                <BookingView
                  booking={bookingToView}
                  key={bookingToView._id}
                ></BookingView>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
