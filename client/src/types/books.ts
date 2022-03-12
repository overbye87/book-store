export type IComment = {
  id: number;
  text: string;
  bookId: number;
  userId: number;
  parrentId: number;
};

export type IBook = {
  id: number;
  name: string;
  price: number;
  description: string;
  img: string;
  rating: any[];
  comment: IComment[];
  authorId: number;
  genreId: number;
  author: { id: number; name: string };
  genre: { id: number; name: string };
};

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
  payload: { rows: any[]; count: number; page: number; limit: number };
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
  books: null | { rows: any[]; count: number; page: number; limit: number };
  loading: boolean;
  error: null | string | object;
}
