import { ContactForm } from "../components/ContactForm";
import "./Contact.scss";

export const Contact = () => {
  return (
    <>
      <div className="contact-wrapper">
        <div className="user-area">
          <h2>Kontakt</h2>
          <ContactForm></ContactForm>
        </div>
      </div>
    </>
  );
};
