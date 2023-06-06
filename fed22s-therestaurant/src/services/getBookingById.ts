import axios from "../../node_modules/axios/index";

export const getBookingById = async (bookingId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/bookings/${bookingId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Could not find booking");
  }
};
