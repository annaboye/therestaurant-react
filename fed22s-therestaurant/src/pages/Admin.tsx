import { getBookings } from "../services/getBookings";
import { BookingView } from "../components/BookingView";
import { createBooking } from "../services/createBooking";
import { BookingList } from "../components/BookingList";
import { useState, FormEvent, ChangeEvent, useReducer, useEffect } from "react";
import { BookingForm } from "../components/BookingForm";
import { ActionType, BookingsReducer } from "../reducers/BookingsReducer";
import {
  BookingContext,
  BookingDispatchContext,
} from "../contexts/BookingContext";
import { ClipLoader } from "react-spinners";
import "./Admin.scss";

export const Admin = () => {
  const [bookings, dispatch] = useReducer(BookingsReducer, []);
  const [showForm, setShowForm] = useState(false);
  const [showFirstChoice, setShowFirstChoice] = useState(true);
  const [showSecondChoice, setShowSecondChoice] = useState(false);
  const [showBookingList, setShowBookingList] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const bookingData = await getBookings();
        dispatch({
          type: ActionType.GET_ALL,
          payload: JSON.stringify(bookingData),
        });
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }

    fetchBookings();
  }, []);

  const showSpinner = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowBookingList(true);
    }, 1000);
  };

  const handleShowForm = () => {
    setShowForm(true);
    setShowSuccess(false);
  };

  const handleShowSecondChoice = () => {
    setShowSecondChoice(true);
    setShowFirstChoice(false);
    setShowForm(false);
    setShowSuccess(false);
  };

  const handleShowBookingList = () => {
    showSpinner();
    setShowSecondChoice(false);
    /* setShowBookingList(false); */
  };

  const handleChangeShowSuccess = () => {
    return;
  };

  const goBacktoSecondChoice = () => {
    setShowSecondChoice(true);
    setShowBookingList(false);
  };

  const goBackToFirstChoice = () => {
    setShowFirstChoice(true);
    setShowSecondChoice(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    console.log(e.target.value);
  };

  /*   const searchBookingByDate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: ActionType.FILTER, payload: userInput });
    
  };
 */
  return (
    <>
      <BookingContext.Provider value={bookings}>
        <BookingDispatchContext.Provider value={dispatch}>
          <div className="alt-wrapper">
            {showFirstChoice && (
              <>
                <button onClick={handleShowSecondChoice}>
                  Hantera bokningar
                </button>
                <button onClick={handleShowForm}>Ny bokning</button>
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

            {showSecondChoice && (
              <>
                <form
                /*  onSubmit={(e) => {
                    searchBookingByDate(e);
                  }} */
                >
                  <div className="form-group">
                    <label htmlFor="date"> Välj datum:</label>
                    <input
                      type="date"
                      value={userInput}
                      onChange={handleChange}
                      name="date"
                      required
                    />
                  </div>
                  <button>Hämta bokningar</button>
                </form>
                <button onClick={handleShowBookingList}>
                  Hämta alla bokningar
                </button>
                <button onClick={goBackToFirstChoice}>Tillbaka</button>
              </>
            )}

            {showForm && (
              <BookingForm changeShow={handleChangeShowSuccess}></BookingForm>
            )}

            {showBookingList && (
              <>
                <button onClick={goBacktoSecondChoice}>Tillbaka</button>
                <BookingList></BookingList>
              </>
            )}
          </div>
        </BookingDispatchContext.Provider>
      </BookingContext.Provider>
    </>
  );
};
