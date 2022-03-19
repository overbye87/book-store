import axios from "axios";
import { Dispatch } from "redux";
import { $host } from "../../http";
import { BookAction, BookActionTypes } from "../../types/books";

export const fetchBooks = (searchParams: URLSearchParams) => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      // set state.book.loading to true
      dispatch({ type: BookActionTypes.FETCH_BOOKS });
      // start fetch
      const response = await $host.get("api/book", {
        params: Object.fromEntries(searchParams),
      });
      // if fetch success put data into state.book.books
      dispatch({
        type: BookActionTypes.FETCH_BOOKS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
      // if fetch failed put error into state.book.error
      dispatch({
        type: BookActionTypes.FETCH_BOOKS_ERROR,
        payload: "An error occurred loading the list of books",
      });
    }
  };
};
