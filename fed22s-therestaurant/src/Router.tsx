import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Booking } from "./pages/Booking";
import { Contact } from "./pages/Contact";
import { Admin } from "./pages/Admin";
import { Error } from "./pages/Error";
import { BookingView } from "./pages/BookingView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        index: true,
      },
      {
        path: "/booking",
        element: <Booking></Booking>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },

      {
        path: "/admin",
        element: <Admin></Admin>,
      },

      {
        path: "/booking/:id",
        element: <BookingView bookingId=""></BookingView>,
      },
    ],
  },
]);
