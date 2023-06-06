import { getBookings } from "../services/getBookings";
import { BookingView } from "../components/BookingView";
import { createBooking } from "../services/createBooking";
import { BookingList } from "../components/BookingList";
import { useState } from "react";
import { BookingForm } from "../components/BookingForm";

export const Admin = () => {
  const [showForm, setShowForm] = useState(false);
  const [showFirstChoice, setShowFirstChoice] = useState(true);
  const [showSecondChoice, setShowSecondChoice] = useState(false);
  const [showBookingList, setShowBookingList] = useState(false);

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleShowSecondChoice = () => {
    setShowSecondChoice(true);
    setShowFirstChoice(false);
    setShowForm(false);
  };

  const handleShowBookingList = () => {
    setShowBookingList(true);
  };
  return (
    <>
      <div>
        {showFirstChoice && (
          <>
            <button onClick={handleShowSecondChoice}>Hantera bokningar</button>
            <button onClick={handleShowForm}>Ny bokning</button>
          </>
        )}

        {showSecondChoice && (
          <>
            <button onClick={handleShowBookingList}>
              Hämta alla bokningar
            </button>
            <button>Välj datum</button>
          </>
        )}

        {showForm && <BookingForm></BookingForm>}

        {showBookingList && <BookingList></BookingList>}
      </div>
    </>
  );
};
