import { getBookings } from "../services/getBookings";
import { BookingView } from "../components/BookingView";

import { createBooking } from "../services/createBooking";
export const Admin = () => {
  const getBookings = () => {};
  return (
    <>
      <button onClick={getBookings}>Admin</button>
      <button onClick={createBooking}>Create</button>

      <div>
        {/*  {bookings.map((b) => (
          <BookingView booking={b} key={b.id}></BookingView>
        ))} */}
      </div>
    </>
  );
};
