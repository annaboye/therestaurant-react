import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <>
      <ul>
        <li>
          <Link to={"/"}>Hem</Link>
        </li>
        <li>
          <Link to={"/booking"}>Bokning</Link>
        </li>
        <li>
          <Link to={"/contact"}>Kontakt</Link>
        </li>
      </ul>
    </>
  );
};
