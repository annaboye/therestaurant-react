import { getBookings } from "../services/getBookings";
import { BookingList } from "../components/BookingList";
import { useState, useReducer } from "react";
import { BookingForm } from "../components/BookingForm";
import { ActionType, BookingsReducer } from "../reducers/BookingsReducer";
import {
  BookingContext,
  BookingDispatchContext,
} from "../contexts/BookingContext";
import { ClipLoader } from "react-spinners";
import "./Admin.scss";
import { CancelBooking } from "../components/CancelBooking";

export const Admin = () => {
  const [bookings, dispatch] = useReducer(BookingsReducer, []);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const showSpinner = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setCurrentPage(4);
    }, 1000);
  };

  const handleShowBookingForm = () => {
    setCurrentPage(3);
  };

  const showHandleBookings = () => {
    setCurrentPage(2);
  };

  const handleShowBookingList = () => {
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
    setCurrentPage(0);
    showSpinner();
  };

  const goBacktoSecondChoice = () => {
    setCurrentPage(2);
  };

  const goBackToFirstChoice = () => {
    setCurrentPage(1);
  };

  return (
    <>
      <BookingContext.Provider value={bookings}>
        <BookingDispatchContext.Provider value={dispatch}>
          <div className="alt-wrapper">
            {currentPage === 1 && (
              <>
                <div className="page1">
                  <button onClick={showHandleBookings}>
                    Hantera bokningar
                  </button>
                  <button onClick={handleShowBookingForm}>Ny bokning</button>
                </div>
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

            {currentPage === 2 && (
              <>
                <button onClick={handleShowBookingList}>
                  Hämta alla bokningar
                </button>
                <div>
                  <h2>Hantera bokning:</h2>
                  <CancelBooking
                    changeShowBooking={() => {
                      return;
                    }}
                  ></CancelBooking>
                </div>
                <button onClick={goBackToFirstChoice}>Tillbaka</button>
              </>
            )}

            {currentPage === 3 && (
              <>
                <BookingForm
                  isAdmin={true}
                  changeShow={() => {
                    return;
                  }}
                ></BookingForm>
                <button onClick={goBackToFirstChoice}>Tillbaka</button>
              </>
            )}

            {currentPage === 4 && (
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
