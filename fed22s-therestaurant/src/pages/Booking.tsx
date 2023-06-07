import { useState } from "react";
import { BookingForm } from "../components/BookingForm";
import { CancelBooking } from "../components/CancelBooking";
import { Link } from "react-router-dom";

export const Booking = () => {
  const [showForm, setShowForm] = useState(true);
  const [showBack, setShowBack] = useState(false);
  const [showSucces, setShowSuccess] = useState(false);

  const handleChangeShowBooking = () => {
    setShowForm(false);
    setShowBack(true);
  };

  const handleChangeShowSuccess = () => {
    setShowSuccess(true);
    setShowForm(false);
    setShowBack(true);
  };

  return (
    <>
      <div>
        {showForm && (
          <div>
            <h2>Bokning</h2>
            <BookingForm changeShowSuccess={handleChangeShowSuccess} />
          </div>
        )}

        {showBack && (
          <p>
            <Link to={"/"}>Tillbaka</Link>
          </p>
        )}

        {showSucces && (
          <>
            <div>Tack! Din bokning ID: </div>
          </>
        )}
      </div>

      <CancelBooking changeShowBooking={handleChangeShowBooking} />
    </>
  );
};
