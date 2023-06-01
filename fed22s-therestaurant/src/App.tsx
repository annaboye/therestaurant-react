import { RouterProvider } from "react-router";
import "./App.scss";
import { router } from "./Router";
import {
  BookingContext,
  BookingDispatchContext,
} from "./contexts/BookingContext";
import { useReducer } from "react";
import { BookingsReducer } from "./reducers/BookingsReducer";

function App() {
  const [bookings, dispatch] = useReducer(BookingsReducer, []);

  return (
    <>
      <BookingContext.Provider value={bookings}>
        <BookingDispatchContext.Provider value={dispatch}>
          <RouterProvider router={router}></RouterProvider>
        </BookingDispatchContext.Provider>
      </BookingContext.Provider>
    </>
  );
}

export default App;
