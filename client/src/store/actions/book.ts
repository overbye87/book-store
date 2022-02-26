import axios from "axios";
import { Dispatch } from "redux";
import { $host } from "../../http";
import { BookAction, BookActionTypes } from "../../types/books";

export const fetchBooks = (author: number, genre: number) => {
  return async (dispatch: Dispatch<BookAction>) => {
    try {
      // set state.book.loading to true
      dispatch({ type: BookActionTypes.FETCH_BOOKS });
      // start fetch
      let url = "api/book/?";
      if (author) {
        url += `&author=${author}`;
      }
      if (genre) {
        url += `&genre=${genre}`;
      }
      console.log("fetchBookURL:", url);
      const response = await $host.get(url);
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
