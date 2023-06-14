import { ChangeEvent, FormEvent, useState } from "react";
import "./ContactForm.scss";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import CookieConsent from "react-cookie-consent";


export const ContactForm = () => {
  const [userInput1, setUserInput1] = useState("");
  const [userInput2, setUserInput2] = useState("");
  const [showThanks, setShowThanks] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userInput3, setUserInput3] = useState("");
  const [showConsent, setShowConsent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setUserInput1("");
    setUserInput2("");
    setShowForm(false);
    
     setShowConsent(true);
  };
  const showSpinner = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowThanks(true);
    }, 1000);}

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput1(e.target.value);
  };
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput2(e.target.value);
  };

  const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput3(e.target.value);
  };

  const handleAccept = () => {
    setUserInput1("");
    setUserInput2("");
    setUserInput3("");
    showSpinner();
  };

  return (
    <>
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
          Jag intygar att jag har tagit del av informationen om behandlingen av
          mina personuppgifter.
        </CookieConsent>
      )}
     
    


      {showThanks && (
        <div className="thanks-wrapper">
          <div>
            <h3>Tack för ditt mail. Vi återkommer så fort vi kan.</h3>
            <FontAwesomeIcon className="check-icon" icon={faCircleCheck} />
          </div>
          <div>
            <Link to={"/"}>
              <button>Tillbaka till Hem</button>
            </Link>
          </div>
        </div>
      )}
      
      
      {showForm && (
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
              <input
                type="text"
                onChange={handleChangeName}
                value={userInput1}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={handleChangeEmail}
                value={userInput2}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea rows={5} cols={30} onChange={handleChangeMessage} value={userInput3} required></textarea>
            </div>

            <button>Skicka</button>
          </form>
        </div>
      )}

      {loading && (
        <div className="spinner-wrapper">
          <ClipLoader
            color={"rgb(0, 183, 255)"}
            loading={loading}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          </div>)}
          </div>
               

    </>)
  ;
};
