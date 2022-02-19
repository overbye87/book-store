import { BookActionTypes, BookAction, IBookState } from "../../types/books";

const initialState: IBookState = {
  books: [
    {
      name: "Treasure Island",
      price: 500,
      img: "img1.jpg",
      authorId: 1,
      genreId: 1,
    },
    {
      name: "Burattino",
      price: 300,
      img: "img2.jpg",
      authorId: 2,
      genreId: 2,
    },
    {
      name: "Book4",
      price: 400,
      img: "img2.jpg",
      authorId: 1,
      genreId: 2,
    },
    {
      name: "Book5",
      price: 600,
      img: "img2.jpg",
      authorId: 2,
      genreId: 1,
    },
    {
      name: "Book6",
      price: 200,
      img: "img2.jpg",
      authorId: 2,
      genreId: 2,
    },
    {
      name: "Book7",
      price: 700,
      img: "img2.jpg",
      authorId: 1,
      genreId: 1,
    },
  ],
  loading: false,
  error: null,
};

export const bookReducer = (
  state = initialState,
  action: BookAction
): IBookState => {
  switch (action.type) {
    case BookActionTypes.FETCH_BOOKS:
      return { loading: true, error: null, books: [] };
    case BookActionTypes.FETCH_BOOKS_SUCCESS:
      return { loading: false, error: null, books: action.payload };
    case BookActionTypes.FETCH_BOOKS_ERROR:
      return { loading: false, error: action.payload, books: [] };
    default:
      return state;
  }
};
