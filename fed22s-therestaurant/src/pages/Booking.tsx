import { useState } from "react";
import { BookingForm } from "../components/BookingForm";
import { CancelBooking } from "../components/CancelBooking";
import { Link } from "react-router-dom";
import "./Booking.scss";

export const Booking = () => {
  const [showForm, setShowForm] = useState(true);
  const [showBack, setShowBack] = useState(false);
  const [showCancel, setShowCancel] = useState(true);
  const [showtext, setShowText] = useState(true)

  const handleChangeShowBooking = () => {
    setShowForm(false);
    setShowBack(true);
    setShowText(false)
  };

  const handleChangeShowCancel = () => {
    setShowCancel(false);
    setShowText(false)
  };

  return (
    <>
      <div className="booking-wrapper">
        <div className="user-area">
          {showForm && (
            <div>
              <h2>Bokning</h2>
              <BookingForm
                isAdmin={false}
                changeShow={handleChangeShowCancel}
              />
            </div>
          )}

          {showBack && (
            <p>
              <Link to={"/"}>Tillbaka</Link>
            </p>
          )}

           {showtext && <><h3>Hantera din bokning</h3>
               <p>
                Skriv in ditt bokningsnummer här för avboka eller kolla tid och
                datum:
              </p>
              </>}

          {showCancel && (
            <div className="cancel-wrapper">
              
              <CancelBooking changeShowBooking={handleChangeShowBooking} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
