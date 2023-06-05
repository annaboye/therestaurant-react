import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import {
  BookingContext,
  BookingDispatchContext,
} from "../contexts/BookingContext";
import "./ContactForm.scss";
import { ActionType } from "../reducers/BookingsReducer";

const defaultForm = {
  date: "",
  time: "",
  amountOfPersons: "",
  description: "",
  guest: { name: "", email: "", mobile: "" },
};

export const BookingForm = () => {
  const bookings = useContext(BookingContext);
  const dispatch = useContext(BookingDispatchContext);

  const [userInput, setUserInput] = useState(defaultForm);
  const [showDate, setShowDate] = useState(true);
  const [showTime, setShowTime] = useState(false);
  const [showPersonForm, setShowPersonForm] = useState(false);
  const [noTables, setNotables] = useState(false);

  const handleSubmitBooking = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    confirm("gdpr.....");
    dispatch({ type: ActionType.ADDED, payload: JSON.stringify(userInput) });
    setUserInput(defaultForm);
  };

  const searchAvalibleTables = () => {
    setShowDate(false);
    setShowTime(true);
  };

  const chooseTime = () => {
    setShowTime(false);
    setShowPersonForm(true);
  };

  const handleChangeOne = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setUserInput({ ...userInput, [name]: e.target.value });
  };

  const handleChangeTwo = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    setUserInput({
      ...userInput,
      guest: { ...userInput.guest, [name]: e.target.value },
    });
  };

  return (
    <div className="form-wrapper ">
      {showDate && (
        <form onSubmit={searchAvalibleTables}>
          <div className="form-group">
            <label htmlFor="date"> Välj datum:</label>
            <input
              type="date"
              value={userInput.date}
              onChange={handleChangeOne}
              name="date"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amoutOfPersons"> Antal personer:</label>
            <input
              type="number"
              value={userInput.amountOfPersons}
              onChange={handleChangeOne}
              name="amountOfPersons"
              required
            />
          </div>
          <button>sök lediga bord</button>
        </form>
      )}

      {showTime && (
        <form onSubmit={chooseTime}>
          <div className="form-group">
            <label>
              Välj tid
              <select
                name="time"
                onChange={(e) =>
                  setUserInput({ ...userInput, time: e.target.value })
                }
                required
              >
                <option value=""></option>
                <option value="18:00">18:00</option>
                <option value="21:00">21:00</option>
              </select>
            </label>
          </div>
          <button>Välj tid</button>
        </form>
      )}

      {noTables && (
        <div className="form-group">
          {" "}
          Tyvärr fanns inga lediga bord denna dag{" "}
          <button>Gör ny sökning</button>
        </div>
      )}

      {showPersonForm && (
        <form onSubmit={handleSubmitBooking}>
          <div className="form-group">
            <label htmlFor="name"> Namn:</label>
            <input
              type="text"
              value={userInput.guest.name}
              onChange={handleChangeTwo}
              name="name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email"> Mail:</label>
            <input
              type="email"
              value={userInput.guest.email}
              onChange={handleChangeTwo}
              name="email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile"> Telefonnummer:</label>
            <input
              type="tel"
              value={userInput.guest.mobile}
              onChange={handleChangeTwo}
              name="mobile"
              required
            />
          </div>
          <div className="form-group">
            <label>Meddelande till oss</label>
            <input type="text" name="description" onChange={handleChangeOne} />
          </div>
          <button> boka</button>
          <button> avbryt</button>
        </form>
      )}
    </div>
  );
};
