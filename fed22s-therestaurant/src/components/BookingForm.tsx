import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import "./ContactForm.scss";
import { getBookings } from "../services/getBookings";
import { getBookingsByDate } from "../services/getBookingsByDate";
import { createBooking } from "../services/createBooking";
import { ClipLoader } from "react-spinners";
import "./BookingForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Booking } from "../pages/Booking";

const defaultForm = {
  date: "",
  time: "",
  amountOfPersons: 0,
  description: "",
  guest: { name: "", email: "", mobile: "" },
};

export const BookingForm = () => {
  const [userInput, setUserInput] = useState(defaultForm);
  const [showDate, setShowDate] = useState(true);
  const [showTime, setShowTime] = useState(false);
  const [showPersonForm, setShowPersonForm] = useState(false);
  const [noTables, setNotables] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [showBookingId, setShowBookingId] = useState(false);

  const showSpinner = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowBookingId(true);
    }, 3000);
  };

  const handleSubmitBooking = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showSpinner();
    confirm("gdpr.....");

    try {
      const newBooking = await createBooking(userInput);
      setUserInput(defaultForm);
      setShowPersonForm(false);
      setBookingId(newBooking._id); // Assign the created booking ID to bookingId state
    } catch (error) {
      console.error(error);
    }
  };

  const searchAvalibleTables = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let thisDateBookings = await getBookingsByDate(userInput.date);
    console.log(thisDateBookings);
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
      {loading && (
        <div className="spinner-wrapper">
          <ClipLoader
            color={"rgb(0, 183, 255)"}
            loading={loading}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      {showBookingId && (
        <div className="booking-id-wrapper">
          <h3>Här är ditt bokningsnummer: </h3>
          <p>{bookingId}</p>

          <div>
            <FontAwesomeIcon className="check-icon" icon={faCircleCheck} />
          </div>
        </div>
      )}
    </div>
  );
};
