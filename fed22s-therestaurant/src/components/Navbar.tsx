import { useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setMenuClass("menu visible");
    } else {
      setBurgerClass("burger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  const closeMenu = () => {
    setIsMenuClicked(false);
    setMenuClass("menu hidden");
    setBurgerClass("burger-bar unclicked");
  };

  return (
    <div className="burger-wrapper" style={{ width: "100%" }}>
      <nav>
        <div className="burger-menu" onClick={updateMenu}>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
          <div className={burger_class}></div>
        </div>

        <div className="loggo-mobile"></div>

        <div className="adjuster"></div>
      </nav>

      <div className={menu_class}>
        <div className="bar-wrapper">
          <Link to={"/"}>
            <div className="loggo"></div>
          </Link>
          <div className="bar">
            <ul>
              <li>
                <Link to={"/"} onClick={closeMenu}>
                  Hem
                </Link>
              </li>
              <li>
                <Link to={"/booking"} onClick={closeMenu}>
                  Bokning
                </Link>
              </li>
              <li>
                <Link to={"/contact"} onClick={closeMenu}>
                  Kontakt
                </Link>
              </li>
              <li>
                <Link to={"/admin"} onClick={closeMenu}>
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

/* import { Link } from "react-router-dom";

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
 */
