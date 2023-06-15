import { IBooking } from "../models/IBooking";
import { useContext, useState } from "react";

import { deleteBooking } from "../services/deleteBooking";
import { BookingDispatchContext } from "../contexts/BookingContext";
import { ActionType } from "../reducers/BookingsReducer";
import "./Bookingview.scss";
import { Spinner } from "./Spinner";

interface IBookingProps {
  booking: IBooking;
}

export const BookingView = ({ booking }: IBookingProps) => {
  const dispatch = useContext(BookingDispatchContext);
  const [deleted, setDeleted] = useState(false);
  const [notDeleted, setNotDeleted] = useState(false)
  const [showSpinner, setShowSpinner] =useState(false)

  const deleteThisBooking = async (bookingId: string) => {
    setShowSpinner(true)
    try{
    const deletedBooking = await deleteBooking(bookingId);
  
    if(deletedBooking){dispatch({ type: ActionType.REMOVE, payload: bookingId as string });
    setNotDeleted(false)
    
    setDeleted(true)
    setShowSpinner(false)}
    else{
     
    setNotDeleted(true)
    }}catch(error){
 console.log(error)
 setNotDeleted(true)
    }
  
  }

  if (deleted) {
    return <div>Bokning raderades!</div>;
  }
 
  if (booking) {
    return (
      <div>
        
        <h3>ID: {booking._id}</h3>
        <p>Datum: {new Date(booking.date).toLocaleDateString("sv-SE")}</p>
        <p>Tid: {booking.time}</p>
        <p>Antal personer: {booking.amountOfPersons}</p>
        <p>Namn: {booking.guest.name}</p>
        <p>Mail: {booking.guest.email}</p>
        <p>Telefonnummer: {booking.guest.mobile}</p>
        <p>Meddelande: {booking.description}</p>

        <div className="spinner-button-wrapper">
        <button
          className="delete-button"
          onClick={() => {
            if (booking && booking._id) deleteThisBooking(booking._id);
          }}
        >
          Ta bort bokning
        </button>
        {showSpinner && <Spinner></Spinner>}
        </div>
        {notDeleted && <div>tyvärr gick det inte att göra en avbokning just nu</div>}
      </div>
    );
  } else {
    return <div>Bokning hittades inte!</div>;
  }
};
