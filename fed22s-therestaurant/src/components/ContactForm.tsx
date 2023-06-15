import { ChangeEvent, FormEvent, useState } from "react";
import "./ContactForm.scss";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import CookieConsent from "react-cookie-consent";

const defaultForm={
  name: "",
  mail: "",
  message: "",

} 

export const ContactForm = () => {
  const [showThanks, setShowThanks] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);

  const [userInput, setUserInput] = useState(defaultForm)
  
  const [showConsent, setShowConsent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowConsent(true);
  };
  const showSpinner = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowThanks(true);
    }, 1000);}


    const handleChange = (e: ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLTextAreaElement> ) => {
      const name = e.target.name;
      setUserInput({ ...userInput, [name]: e.target.value });
    };


  const handleAccept = () => {
    setShowForm(false);
    setUserInput(defaultForm)
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
                name="name"
                onChange={handleChange}
                value={userInput.name}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
              name="mail"
                type="email"
                onChange={handleChange}
                value={userInput.mail}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message"
              >Message</label>
              <textarea name="message" rows={5} cols={30} onChange={handleChange} value={userInput.message} required></textarea>
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
