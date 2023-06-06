import { IBooking } from "../models/IBooking";
import { createBooking } from "../services/createBooking";

export interface IAction {
  type: ActionType;
  payload: string | IBooking[];
}

export enum ActionType {
  ADDED,
  REMOVE,
  SEARCH,
  FILTER,
  GET_ALL,
}

export const BookingsReducer: React.Reducer<IBooking[], IAction> = (
  bookings,
  action
) => {
  switch (action.type) {
    case ActionType.ADDED: {
      createBooking(JSON.parse(action.payload as string));
      return [...bookings, JSON.parse(action.payload as string)];
    }

    case ActionType.GET_ALL: {
      return action.payload as IBooking[];
    }

    default:
      return bookings;
  }
};
