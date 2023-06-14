import { ChangeEvent, FormEvent, useState } from "react";
import { BookingView } from "./BookingView";
import { getBookingById } from "../services/getBookingById";
import { IBooking } from "../models/IBooking";
import "./CancelBooking.scss";

interface IBookingViewProps {
  changeShowBooking(): void;
}

export const CancelBooking = ({ changeShowBooking }: IBookingViewProps) => {
  const [userInput, setUserInput] = useState("");
  const [showInput, setShowInput] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [booking, setBooking] = useState<IBooking>({
    guest: {
      name: "",
      email: "",
      mobile: "",
    },
    date: "",
    time: "",
    amountOfPersons: 0,
  });
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
  return (
    <>
      <div>
        {showInput && (
          <div className="form-group">
            <form onSubmit={(e) => handleSubmit(e, userInput)}>
              <input
                placeholder="bokningsnummer.."
                type="text"
                onChange={handleChange}
                value={userInput}
                required
              />
              <button className="booking-button">Hantera bokning</button>
            </form>
          </div>
        )}
        {showBooking && <BookingView booking={booking} />}
        {showError && <div>Bokning hittades inte!</div>}
      </div>
    </>
  );
};
