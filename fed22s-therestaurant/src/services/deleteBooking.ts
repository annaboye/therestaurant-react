import axios from "../../node_modules/axios/index";

export const deleteBooking = async (bookingId: string | undefined) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/bookings/${bookingId}`
    );
    console.log(response.status);
    if (response.status === 204) {
      return true;
    }
    else{
      return false;
    }
  } catch (error) {
    throw new Error("Could not find booking");
  }
};
