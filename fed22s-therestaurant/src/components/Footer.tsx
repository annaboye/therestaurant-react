import { Link } from "react-router-dom";
import "./Footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faS,
  faAlignRight,
  faEnvelope,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faS, faAlignRight);
import {
  fab,
  faGithubSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
library.add(fab, faGithubSquare);
library.add(fab, faLinkedin);

export const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-group">
        <ul>
          <h4>Kontakt</h4>
          <li>
            {" "}
            <FontAwesomeIcon icon={faPhone} /> 070 123 45 67
          </li>
          <li>
            <FontAwesomeIcon icon={faLocationDot} /> Resturangvägen 1
          </li>
          <li>
            <Link className="email-link" to={"/contact"}>
              <FontAwesomeIcon icon={faEnvelope} /> info@resturang.se
            </Link>
          </li>
        </ul>
        <div className="footer-group">
          <ul>
            <h4>Öppettider</h4>
            <li>Mån: 11:00 - 22:00</li>
            <li>Tis: 11:00 - 22:00</li>
            <li>Ons: 11:00 - 22:00</li>
            <li>Tor: 11:00 - 22:00</li>
            <li>Fre: 11:00 - 23:00</li>
            <li>Lör: 11:00 - 23:00</li>
            <li>Sön: 11:00 - 22:00</li>
          </ul>
        </div>
      </div>

      <div>
        <div className="icons-wrapper">
          <a href={"https://instagram.se"}>
            <FontAwesomeIcon
              className="instagram-icon"
              icon={["fab", "instagram"]}
            />
          </a>

          <a href={"https://www.linkedin.com/"}>
            <FontAwesomeIcon
              className="linkedin-icon"
              icon={["fab", "linkedin"]}
            />
          </a>
          <a href={"https://www.facebook.com/"}>
            <FontAwesomeIcon
              className="facebook-icon"
              icon={["fab", "facebook"]}
            />
          </a>
        </div>
        <div className="footer-links">
          <Link to={"/"}>Hem</Link>
          <Link to={"/booking"}>Bokning</Link>
          <Link to={"/contact"}>Kontakt</Link>
          <Link to={"/admin"}>Admin</Link>
        </div>
      </div>
    </div>
  );
};
