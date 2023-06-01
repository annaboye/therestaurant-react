import { IBooking } from "../models/IBooking";

export interface IAction {
  type: ActionType;
  payload: string;
}

export enum ActionType {
  ADDED,
}

export const BookingsReducer = (bookings: IBooking[], action: IAction) => {
  switch (action.type) {
    case ActionType.ADDED: {
      return [...bookings, JSON.parse(action.payload)];
    }

    default:
      return bookings;
  }
};
