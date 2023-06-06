import { Link } from "react-router-dom";
import { Admin } from "./Admin";
import "./Home.scss"

export const Home = () => {
  return (
    <>
    
    <div className="bg-wrapper">
    <h1>The Restaurant</h1>

      <Link to={"/booking"}>
      <button className="big-btn">Boka bord</button>
              </Link>
      
      </div>
    </>
  );
};
