import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import "./ContactForm.scss";
import { getBookings } from "../services/getBookings";
import { getBookingsByDate } from "../services/getBookingsByDate";
import { createBooking } from "../services/createBooking";

interface IBookingFormProps {
  changeShowSuccess(): void;
}

const defaultForm = {
  date: "",
  time: "",
  amountOfPersons: "",
  description: "",
  guest: { name: "", email: "", mobile: "" },
};

export const BookingForm = ({ changeShowSuccess }: IBookingFormProps) => {
  const [userInput, setUserInput] = useState(defaultForm);
  const [showDate, setShowDate] = useState(true);
  const [showTime, setShowTime] = useState(false);
  const [showPersonForm, setShowPersonForm] = useState(false);
  const [noTables, setNotables] = useState(false);

  const handleSubmitBooking = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    confirm("gdpr.....");
    const booking = JSON.stringify(userInput);
    createBooking(JSON.parse(booking));
    setUserInput(defaultForm);
    changeShowSuccess();
  };

  const searchAvalibleTables = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let thisDateBookings = await getBookingsByDate(userInput.date);
    console.log(thisDateBookings);
    setShowDate(false);
    setShowTime(true);
  };

  const chooseTime = (e:FormEvent) => {
    e.preventDefault();
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
        <form
          onSubmit={(e) => {
            searchAvalibleTables(e);
          }}
        >
          <div className="form-group">
            <label htmlFor="date"> Välj datum:</label>
            <input
              type="date"
              value={userInput.date}
              min= {new Date().toISOString().split('T')[0]}
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
              max="12"
              min="1"
              required
            />
            <p>För större bokningar än 12, vänligen ring oss istället</p>
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
