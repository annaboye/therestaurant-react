import { useState } from "react";
import { BookingForm } from "../components/BookingForm";
import { CancelBooking } from "../components/CancelBooking";
import { Link } from "react-router-dom";

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
            <BookingForm changeShow={handleChangeShowCancel}/>
          </div>
        )}

        {showBack && (
          <p>
            <Link to={"/"}>Tillbaka</Link>
          </p>
        )}


      </div>
      
      {showCancel &&<CancelBooking changeShowBooking={handleChangeShowBooking} />}
    </>
  );
};
