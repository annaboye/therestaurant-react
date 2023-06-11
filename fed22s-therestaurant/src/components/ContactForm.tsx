import { ChangeEvent, FormEvent, useState } from "react";
import "./ContactForm.scss";

export const ContactForm = () => {
  const [userInput1, setUserInput1] = useState("");
  const [userInput2, setUserInput2] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setUserInput1("");
    setUserInput2("");
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput1(e.target.value);
  };
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput2(e.target.value);
  };

  return (
    <div className="form-wrapper">
      <div className="form-description">
        <h3>Företag / Event</h3>
        <p>
          För större ordrar hänvisar vi hit för att på bästa sätt kunna
          skräddarsy en lösning efter behov. Skriv gärna till oss om ni har
          funderingar eller frågor, så ska vi snabbt göra vårt bästa för att
          hjälpa till.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" onChange={handleChangeName} value={userInput1} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" onChange={handleChangeEmail} value={userInput2} />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea rows={5} cols={30}></textarea>
        </div>

        <button>Skicka</button>
      </form>
    </div>
  );
};
