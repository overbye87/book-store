export enum BookActionTypes {
  FETCH_BOOKS = "FETCH_BOOKS",
  FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS",
  FETCH_BOOKS_ERROR = "FETCH_BOOKS_ERROR",
}

interface IFetchBooksAction {
  type: BookActionTypes.FETCH_BOOKS;
}

interface IFetchBooksSuccessAction {
  type: BookActionTypes.FETCH_BOOKS_SUCCESS;
  payload: any[];
}

interface IFetchBooksErrorAction {
  type: BookActionTypes.FETCH_BOOKS_ERROR;
  payload: string | object;
}

export type BookAction =
  | IFetchBooksAction
  | IFetchBooksSuccessAction
  | IFetchBooksErrorAction;

export interface IBookState {
  books: null | any[];
  loading: boolean;
  error: null | string | object;
}
