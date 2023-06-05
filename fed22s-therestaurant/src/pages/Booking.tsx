import { AddBooking } from "../components/AddBooking";
import { BookingForm } from "../components/BookingForm";
import { OffBooking } from "../components/OffBooking";

export const Booking = () => {
  return (
    <>
      <h2>Bokning</h2>

      <BookingForm></BookingForm>
      <OffBooking></OffBooking>
    </>
  );
};
