import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { BookingView } from "./BookingView";
import {
  BookingContext,
} from "../contexts/BookingContext";
import "./BookingList.scss"

export const BookingList = () => {
  const bookings = useContext(BookingContext);
  const [bookingsToView, setBookingsToView] = useState(bookings);

  const [userInput, setUserInput] = useState({ date: "", time: "", name: "" });

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

  const handleSubmitName = (e:FormEvent) =>{
    e.preventDefault();
    setBookingsToView(
      bookings.filter(
        (booking) =>
          booking.guest.name.trim().toLowerCase().includes(userInput.name.trim().toLowerCase()) 
      )
    );
  }

  return (
    <>
      <div className="form-wrapper">
        <h2>Bokningar</h2>
        <div className="form-group">
          <h3>Filtrerar på datum och tid:</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="date"
              value={userInput.date}
              onChange={handleChangeOne}
              name="date"
              required
            />
            <label>
            <input
              type="radio"
              name="time"
              value={"18:00"}
              onChange={handleChangeOne}
              required
              aria-label="18:00"
            />
            18:00
            </label>
            <label>
             <input
              type="radio"
              name="time"
              value={"21:00"}
              onChange={handleChangeOne}
              required
            />
            21:00
            </label>
            
            <button className="name-button">Sök</button>
          </form>
        </div>
        <div className="form-group">
         <h3>Filtrerar på namn:</h3>
          <form onSubmit={handleSubmitName}>
            <input type="text" name="name" required onChange={handleChangeOne}/>
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
          {bookingsToView.length ===0 && <div> Tyvärr hittades inga bokningar gör en ny sökning</div>}
        </div>
      </div>
    </>
  );
};
