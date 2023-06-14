import { IGuest } from "./IGuest";

export interface IBooking {
  _id?: string;
  date: string;
  time: string;
  amountOfPersons: number;
  description?: string;
  guest: IGuest;
}
