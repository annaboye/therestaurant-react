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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();
    const fetchedBooking = await getBookingById(id);

    setShowInput(false);
    changeShowBooking();
    if (fetchedBooking) {
      setBooking(fetchedBooking);
      setShowBooking(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
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
      </div>
    </>
  );
};
