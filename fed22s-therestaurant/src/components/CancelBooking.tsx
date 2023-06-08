import { ChangeEvent, FormEvent, useState } from "react";
import { BookingView } from "./BookingView";
import { getBookingById } from "../services/getBookingById";
import { IBooking } from "../models/IBooking";

interface IBookingViewProps {
  changeShowBooking(): void;
}

export const CancelBooking = ({ changeShowBooking }: IBookingViewProps) => {
  const [userInput, setUserInput] = useState("");
  const [showInput, setShowInput] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [booking, setBooking] = useState<IBooking | undefined>();
  const [showError, setShowError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();

    try {
      const fetchedBooking = await getBookingById(id);

      setShowInput(false);
      changeShowBooking();
      console.log(fetchedBooking);

      if (fetchedBooking) {
        setBooking(fetchedBooking);
        setShowBooking(true);
      }
    } catch (error) {
      console.error(error);
      setShowError(true);
      setUserInput("");
    }
  };
  const handleDeleteBooking = () => {
    setShowBooking(false);
  };
  return (
    <>
      <div>
        {showInput && (
          <form onSubmit={(e) => handleSubmit(e, userInput)}>
            <input type="text" onChange={handleChange} value={userInput} />
            <button>Avboka</button>
          </form>
        )}{" "}
        {showBooking && <BookingView booking={booking} />}
        {showError && <div>Bokning hittades inte!</div>}
      </div>
    </>
  );
};
