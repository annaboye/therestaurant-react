import { useState } from "react";
import { BookingForm } from "../components/BookingForm";
import { CancelBooking } from "../components/CancelBooking";

export const Booking = () => {
  const [showForm, setShowForm] = useState(true);
  const handleChangeShowBooking = () => {
    setShowForm(false);
  };

  return (
    <>
      <>
        <div>
          {showForm && (
            <div>
              <h2>Bokning</h2>
              <BookingForm></BookingForm>
            </div>
          )}
        </div>
      </>
      <CancelBooking
        changeShowBooking={handleChangeShowBooking}
      ></CancelBooking>
    </>
  );
};
