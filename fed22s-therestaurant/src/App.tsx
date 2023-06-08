import { RouterProvider } from "react-router";
import "./App.scss";
import { router } from "./Router";
import {
  BookingContext,
  BookingDispatchContext,
} from "./contexts/BookingContext";
import { useEffect, useReducer } from "react";
import { ActionType, BookingsReducer } from "./reducers/BookingsReducer";
import { getBookings } from "./services/getBookings";

function App() {
  // useEffect(() => {
  //   async function fetchBookings() {
  //     try {
  //       const bookingData = await getBookings();
  //       dispatch({ type: ActionType.GET_ALL, payload: bookingData });
  //     } catch (error) {
  //       console.error("Error fetching bookings:", error);
  //     }
  //   }

  //   fetchBookings();
  // }, []);

  return (
    <>
      {/* <BookingContext.Provider value={bookings}>
        <BookingDispatchContext.Provider value={dispatch}> */}
      <RouterProvider router={router}></RouterProvider>
      {/* </BookingDispatchContext.Provider>
      </BookingContext.Provider> */}
    </>
  );
}

export default App;
