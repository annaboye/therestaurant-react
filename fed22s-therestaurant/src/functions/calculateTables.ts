import { IBooking } from "../models/IBooking";

export const calculateTables = (bookings: IBooking[]): number => {
  let bookedTables = 0;
  console.log(bookings);
  bookings.forEach((booking) => {
    if (booking.amountOfPersons > 6) {
      bookedTables += 2;
    } else {
      bookedTables++;
    }
  });

  console.log(bookedTables);
  return bookedTables;
};
