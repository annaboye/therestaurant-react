import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { BookingDispatchContext } from "../contexts/BookingContext";
import { ActionType } from "../reducers/BookingsReducer";

export const AddBooking = () => {
  const dispatch = useContext(BookingDispatchContext);
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({ type: ActionType.ADDED, payload: userInput });
    setUserInput("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={userInput} onChange={handleChange} />
      <button>Spara</button>
    </form>
  );
};
