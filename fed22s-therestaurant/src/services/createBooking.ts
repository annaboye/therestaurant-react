import axios from "axios";

interface IGuest {
  name: string;

  email: string;

  mobile: string;
}

interface IBooking {
  date: string;

  time: string;

  amountOfPersons: number;

  guest: IGuest;
}

export const createBooking = async () => {
  try {
    const booking = {
      date: "21.10.2023",

      time: "18:00",

      amountOfPersons: 7,

      guest: {
        name: "Adam",

        email: "fghjkl@fgh",

        mobile: "456789",
      },
    };

    const response = await axios.post(
      "http://localhost:4000/api/v1/bookings",
      booking
    );
    console.log(response.data);
    return response.data;
  } catch {
    throw new Error("Could not create booking");
  }
};

createBooking();
