import { ChangeEvent, FormEvent, useState } from "react";
import "./ContactForm.scss";
import { getBookingsByDate } from "../services/getBookingsByDate";
import { createBooking } from "../services/createBooking";
import { ClipLoader } from "react-spinners";
import "./BookingForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faSleigh } from "@fortawesome/free-solid-svg-icons";
import { calculateTables } from "../functions/calculateTables";
import { IBooking } from "../models/IBooking";
import CookieConsent from "react-cookie-consent";
import { Link } from "react-router-dom";

const defaultForm = {
  date: "",
  time: "",
  amountOfPersons: 0,
  description: "",
  guest: { name: "", email: "", mobile: "" },
};

interface IBookingState {
  currentpage: Number;
  error: boolean;
  avalibleTables: boolean;
}

interface IBookingFormProps {
  changeShow: () => void;
  isAdmin: boolean;
}

export const BookingForm = ({ changeShow, isAdmin }: IBookingFormProps) => {
  const [userInput, setUserInput] = useState(defaultForm);
  const [bookingState, setBookingState] = useState<IBookingState>({
    currentpage: 1,
    error: false,
    avalibleTables: true,
  });
  const [show18Avalible, setShow18Avalible] = useState(false);
  const [show21Avalible, setShow21Avalible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [showConsent, setShowConsent] = useState(false);

  const showSpinner = () => {
    setLoading(true);
    setBookingState({ ...bookingState, currentpage: 0, avalibleTables: true });
    setTimeout(() => {
      setLoading(false);
      setBookingState({
        ...bookingState,
        currentpage: 4,
        avalibleTables: true,
      });
    }, 3000);
  };

  const handleSubmitBooking = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowConsent(true);
  };

  const searchAvalibleTables = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeShow();
    let thisDateBookings: IBooking[] = [];
    try {
      thisDateBookings = await getBookingsByDate(userInput.date);

      let tablesLeft18 = calculateTables(
        thisDateBookings.filter((booking) => booking.time === "18:00"),
        +userInput.amountOfPersons
      );
      let tablesLeft21 = calculateTables(
        thisDateBookings.filter((booking) => booking.time === "21:00"),
        +userInput.amountOfPersons
      );

      if (tablesLeft18) {
        setShow18Avalible(true);
      }
      if (tablesLeft21) {
        setShow21Avalible(true);
      }

      if (tablesLeft18 || tablesLeft21) {
        setBookingState({
          ...bookingState,
          currentpage: 2,
          avalibleTables: true,
        });
      } else {
        setBookingState({ ...bookingState, avalibleTables: false });
      }
    } catch (error) {
      setBookingState({ ...bookingState, error: true });
    }
  };

  const chooseTime = (e: FormEvent) => {
    e.preventDefault();
    setBookingState({ ...bookingState, currentpage: 3 });
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

  const handleStopBooking = () => {
    setBookingState({
      ...bookingState,
      currentpage: 1,
      error: false,
      avalibleTables: true,
    });

    setUserInput(defaultForm);
  };

  const handleAccept = async () => {
    showSpinner();
    try {
      const newBooking = await createBooking(userInput);
      setUserInput(defaultForm);
      setBookingId(newBooking._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-wrapper ">
      {showConsent && (
        <CookieConsent
          overlay
          debug={true}
          location="top"
          buttonText="Acceptera"
          onAccept={handleAccept}
          buttonStyle={{
            padding: "0.5rem 1.5rem",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Jag intygar att jag har tagit del av informationen om behandlingen av
          mina personuppgifter.
        </CookieConsent>
      )}

      {bookingState.currentpage === 1 && (
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
              min={new Date().toISOString().split("T")[0]}
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
            {!isAdmin && (
              <p>För större bokningar än 12, vänligen ring oss istället</p>
            )}
          </div>
          <button>sök lediga bord</button>
        </form>
      )}

      {bookingState.error && (
        <div> tyvärr går det inte att göra bokningar just nu </div>
      )}

      {!bookingState.avalibleTables && (
        <div>
          tyvärr finns det inga lediga bord denna dag, gör en ny sökning
        </div>
      )}

      {bookingState.currentpage === 2 && (
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
                {show18Avalible && <option value="18:00">18:00</option>}
                {show21Avalible && <option value="21:00">21:00</option>}
              </select>
            </label>
          </div>
          <button>Gå vidare</button>
        </form>
      )}

      {bookingState.currentpage === 3 && (
        <>
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
              <input
                type="text"
                name="description"
                onChange={handleChangeOne}
              />
            </div>
            <button> boka</button>
          </form>
          <button onClick={handleStopBooking}> avbryt</button>
        </>
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

      {bookingState.currentpage === 4 && (
        <div className="booking-id-wrapper">
          <h3>Tack för din bokning!</h3>
          <h4> Här är ditt bokningsnummer:</h4>
          <p>{bookingId}</p>

          <div>
            <FontAwesomeIcon className="check-icon" icon={faCircleCheck} />
          </div>
          <Link to={"/"}>
            <button>Tillbaka till Hem</button>
          </Link>
        </div>
      )}
    </div>
  );
};
