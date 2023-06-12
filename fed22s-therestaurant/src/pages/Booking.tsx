import { useState } from "react";
import { BookingForm } from "../components/BookingForm";
import { CancelBooking } from "../components/CancelBooking";
import { Link } from "react-router-dom";
import "./Booking.scss";

export const Booking = () => {
  const [showForm, setShowForm] = useState(true);
  const [showBack, setShowBack] = useState(false);
  const [showCancel, setShowCancel] = useState(true);

  const handleChangeShowBooking = () => {
    setShowForm(false);
    setShowBack(true);
  };

  const handleChangeShowCancel = () => {
    setShowCancel(false);
  };

  return (
    <>
      <div>
        {showForm && (
          <div>
            <h2>Bokning</h2>
            <BookingForm isAdmin={false} changeShow={handleChangeShowCancel} />
          </div>
        )}

        {showBack && (
          <p>
            <Link to={"/"}>Tillbaka</Link>
          </p>
        )}
      </div>

      {showCancel && (
        <div className="cancel-wrapper">
          <h3>Hantera din bokning</h3>
          <p>
            Skriv in ditt bokningsnummer här för avboka eller kolla tid och
            datum:
          </p>
          <CancelBooking changeShowBooking={handleChangeShowBooking} />
        </div>
      )}
    </>
  );
};
