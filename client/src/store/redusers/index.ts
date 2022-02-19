import { useReducer } from "react";
import { combineReducers } from "redux";
import { authorReducer } from "./authorReducer";
import { bookReducer } from "./bookReducer";
import { genreReducer } from "./genreReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  book: bookReducer,
  user: userReducer,
  author: authorReducer,
  genre: genreReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
