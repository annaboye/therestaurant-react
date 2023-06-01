import { getBookings } from "../services/getBookings";

export const Admin = () => {
  return (
    <>
      <button onClick={getBookings}>Admin</button>
    </>
  );
};
