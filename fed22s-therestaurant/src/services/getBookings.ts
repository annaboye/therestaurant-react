import axios from "../../node_modules/axios/index";

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

const get = async <T>(url: string) => {
  return await axios.get<T>(url);
};

export const getBookings = async () => {
  try {
    const response = await get<IBooking[]>(
      "http://localhost:4000/api/v1/bookings"
    );
    const bookingsFromApi = response.data;
    return response.data;
  } catch {
    throw new Error("Could not get data from api");
  }
};
