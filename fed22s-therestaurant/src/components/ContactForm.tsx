import { ChangeEvent, FormEvent, useState } from "react";
import "./ContactForm.scss";
import CookieConsent from "react-cookie-consent";

export const ContactForm = () => {
  const [userInput1, setUserInput1] = useState("");
  const [userInput2, setUserInput2] = useState("");
  const [showConsent, setShowConsent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowConsent(true);
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput1(e.target.value);
  };
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput2(e.target.value);
  };

  const handleAccept = () => {
    setUserInput1("");
    setUserInput2("");
  };

  return (
    <div className="form-wrapper">
      {showConsent && (
        <CookieConsent
          overlay
          debug={true}
          location="top"
          buttonText="Acceptera"
          onAccept={handleAccept}
          buttonStyle={{
            padding: "0.5rem 1.5rem",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Denna webbplats använder cookies för att förbättra din upplevelse.
        </CookieConsent>
      )}
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
