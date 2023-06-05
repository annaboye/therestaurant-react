import { IBooking } from "../models/IBooking";
import { createBooking } from "../services/createBooking";

export interface IAction {
  type: ActionType;
  payload: string;
}

export enum ActionType {
  ADDED,
  REMOVE,
  SEARCH,
  FILTER,
}

export const BookingsReducer = (bookings: IBooking[], action: IAction) => {
  switch (action.type) {
    case ActionType.ADDED: {
      createBooking(JSON.parse(action.payload));
      return [...bookings, JSON.parse(action.payload)];
    }

    default:
      return bookings;
  }
};
