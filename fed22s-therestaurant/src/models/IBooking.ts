export interface IBooking {
  date: string;
  time: string;
  amountOfPersons: number;
  guest: IGuest;
}

export interface IGuest {
  name: string;
  email: string;
  mobile: string;
}
