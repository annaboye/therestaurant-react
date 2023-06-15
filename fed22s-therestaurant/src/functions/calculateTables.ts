import { IBooking } from "../models/IBooking";

export const calculateTables = (
  bookings: IBooking[],
  userInputPersons: number
): boolean => {
  let bookedTables = 0;

  bookings.forEach((booking) => {
    if (booking.amountOfPersons > 6) {
      bookedTables += 2;
    } else {
      bookedTables++;
    }
  });
  if (userInputPersons <= 6 && bookedTables < 15) {
    return true;
  }
  if (userInputPersons > 6 && bookedTables < 14) {
    return true;
  }

  return false;
};
