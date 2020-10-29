import { State } from "./state";
import { Stop } from "../types";

export type Action =
  | {
    type: "SET_STOPS";
    payload: Stop[];
  }
  | {
    type: "SET_STOP_NAME";
    payload: string;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_STOPS":
      return {
        ...state,
        stops: action.payload
      };
    case "SET_STOP_NAME":
      return {
        ...state,
        stopName: action.payload
      }; 
    default:
      return state;
  }
};


export const setStops = (payload: Stop[]): Action => {
  return {
    type: "SET_STOPS",
    payload
  }
}

export const setStopName = (payload: string): Action => {
  return {
    type: "SET_STOP_NAME",
    payload
  }
}
 