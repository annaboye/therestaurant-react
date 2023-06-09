import { IBooking } from "../models/IBooking";

export interface IAction {
  type: ActionType;
  payload: string | IBooking[];
}

export enum ActionType {
  REMOVE,
  GET_ALL,
}

export const BookingsReducer: React.Reducer<IBooking[], IAction> = (
  bookings,
  action
) => {
  switch (action.type) {
    case ActionType.GET_ALL: {
      return JSON.parse(action.payload as string);
    }

    case ActionType.REMOVE: {
      return bookings.filter(
        (booking) => booking._id?.toString() !== action.payload
      );
    }

    default:
      return bookings;
  }
};
