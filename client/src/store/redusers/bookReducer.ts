import { BookActionTypes, BookAction, IBookState } from "../../types/books";

const initialState: IBookState = {
  books: null,
  loading: false,
  error: null,
};

export const bookReducer = (
  state = initialState,
  action: BookAction
): IBookState => {
  switch (action.type) {
    case BookActionTypes.FETCH_BOOKS:
      return { loading: true, error: null, books: null };
    case BookActionTypes.FETCH_BOOKS_SUCCESS:
      return { loading: false, error: null, books: action.payload };
    case BookActionTypes.FETCH_BOOKS_ERROR:
      return { loading: false, error: action.payload, books: null };
    default:
      return state;
  }
};
