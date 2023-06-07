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
  const [showSuccess, setShowSuccess] = useState(false);

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
    setShowBookingList(true);
    setShowSecondChoice(false);
  };

  const handleChangeShowSuccess = () => {
    setShowSuccess(true);
    setShowForm(false);
  };

  const goBacktoSecondChoice = () => {
    setShowSecondChoice(true);
    setShowBookingList(false);
  };

  const goBackToFirstChoice = () => {
    setShowFirstChoice(true);
    setShowSecondChoice(false);
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
            <button onClick={goBackToFirstChoice}>Tillbacka</button>
          </>
        )}

        {showForm && (
          <BookingForm
            changeShowSuccess={handleChangeShowSuccess}
          ></BookingForm>
        )}

        {showBookingList && (
          <>
            <button onClick={goBacktoSecondChoice}>Tillbacka</button>
            <BookingList></BookingList>
          </>
        )}

        {showSuccess && <div>Bokning genomförd</div>}
      </div>
    </>
  );
};
