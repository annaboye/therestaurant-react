import axios from "../../node_modules/axios/index";

const deleteBooking = async (bookingId: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/bookings/:${bookingId}`
    );
    console.log(response.data);
  } catch (error) {
    throw new Error("Could not find booking");
  }
};
