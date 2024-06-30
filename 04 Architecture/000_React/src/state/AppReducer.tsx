import { AppState, initialState } from "./AppState";

export type Action = { type: "INCREMENT" } | { type: "DECREMENT" } | { type: "RESET" };

export const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return initialState;

    default:
      return state;
  }
};
