import axios from "axios";
import { Dispatch } from "redux";
import { BookAction, BookActionTypes } from "../../types/books";

export const fetchBooks = () => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      dispatch({ type: BookActionTypes.FETCH_BOOKS });
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch({
        type: BookActionTypes.FETCH_BOOKS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: BookActionTypes.FETCH_BOOKS_ERROR,
        payload: "An error occurred loading the list of books",
      });
    }
  };
};
