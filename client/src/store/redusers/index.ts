import { useReducer } from "react";
import { combineReducers } from "redux";
import { bookReducer } from "./bookReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  book: bookReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
