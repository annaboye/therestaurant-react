import { getBookings } from "../services/getBookings";
import { BookingView } from "../components/BookingView";

import { deleteBookings } from "../services/deleteBooking";
export const Admin = () => {
  return (
    <>
      <button onClick={getBookings}>Admin</button>
      <div>
        {/*  {bookings.map((b) => (
          <BookingView booking={b} key={b.id}></BookingView>
        ))} */}
      </div>
    </>
  );
};
