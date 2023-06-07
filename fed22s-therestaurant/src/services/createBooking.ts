import axios from "axios";

interface IGuest {
  name: string;

  email: string;

  mobile: string;
}

interface IBooking {
  _id?: string;

  date: string;

  time: string;

  amountOfPersons: number;

  guest: IGuest;
}

export const createBooking = async (booking: IBooking) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/bookings",
      booking
    );
    const createdBookingId = response.data;
    console.log(response.data._id);
    return createdBookingId;
  } catch {
    throw new Error("Could not create booking");
  }
};
