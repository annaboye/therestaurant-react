import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <>
      <h3>Denna sida finns inte</h3>
      <Link to="/">tillbaka till startsidan</Link>
    </>
  );
};
