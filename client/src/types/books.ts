import { IAuthor } from "./authors";
import { IGenre } from "./genres";

export type IComment = {
  id: number;
  text: string;
  bookId: number;
  userId: number;
  parrentId: number;
};

export type IRating = {
  id: number;
  rate: number;
  bookId: number;
  userId: number;
};

export type IBook = {
  id: number;
  name: string;
  price: number;
  description: string;
  img: string;
  rating: IRating[];
  comment: IComment[];
  authorId: number;
  genreId: number;
  author: IAuthor;
  genre: IGenre;
};

export enum BookActionTypes {
  FETCH_BOOKS = "FETCH_BOOKS",
  FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS",
  FETCH_BOOKS_ERROR = "FETCH_BOOKS_ERROR",
}

interface IFetchBooksAction {
  type: BookActionTypes.FETCH_BOOKS;
}

interface IBookResponse {
  rows: IBook[];
  count: number;
  page: number;
  limit: number;
}

interface IFetchBooksSuccessAction {
  type: BookActionTypes.FETCH_BOOKS_SUCCESS;
  payload: IBookResponse;
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
  books: null | IBookResponse;
  loading: boolean;
  error: null | string | object;
}
