import { ChangeEvent, FormEvent, useState } from "react";

export const OffBooking = () => {
  const [userInput, setUserInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={userInput} />
        <button>Avboka</button>
      </form>
    </>
  );
};
