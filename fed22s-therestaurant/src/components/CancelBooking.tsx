import { ChangeEvent, FormEvent, useState } from "react";
import { BookingView } from "./BookingView";

interface IBookingViewProps {
  changeShowBooking(): void;
}

export const CancelBooking = ({ changeShowBooking }: IBookingViewProps) => {
  const [userInput, setUserInput] = useState("");
  const [showInput, setShowInput] = useState(true);
  const [showBooking, setShowBooking] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowBooking(true);
    setShowInput(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value); //id
  };

  return (
    <>
      <div>
        {showInput && (
          <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} value={userInput} />
            <button onClick={() => changeShowBooking()}>Avboka</button>
          </form>
        )}{" "}
        {showBooking && <BookingView bookingId={userInput} />}
      </div>
    </>
  );
};
