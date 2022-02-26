import { BookActionTypes, BookAction, IBookState } from "../../types/books";

const initialState: IBookState = {
  books: null,
  // books: [
  //   {
  //     id: 1,
  //     name: "Treasure Island",
  //     price: 500,
  //     img: "img1.jpg",
  //     rating: 34,
  //     authorId: 1,
  //     genreId: 1,
  //     author: { name: "author" },
  //     genre: { name: "genre" },
  //   },
  //   {
  //     id: 2,
  //     name: "Burattino",
  //     price: 300,
  //     img: "img2.jpg",
  //     rating: 12,
  //     authorId: 2,
  //     genreId: 2,
  //     author: { name: "author" },
  //     genre: { name: "genre" },
  //   },
  //   {
  //     id: 3,
  //     name: "Book4",
  //     price: 400,
  //     img: "img2.jpg",
  //     rating: 3,
  //     authorId: 1,
  //     genreId: 2,
  //     author: { name: "author" },
  //     genre: { name: "genre" },
  //   },
  //   {
  //     id: 4,
  //     name: "Book5",
  //     price: 600,
  //     img: "img2.jpg",
  //     rating: 8,
  //     authorId: 2,
  //     genreId: 1,
  //     author: { name: "author" },
  //     genre: { name: "genre" },
  //   },
  //   {
  //     id: 5,
  //     name: "Book6",
  //     price: 200,
  //     img: "img2.jpg",
  //     rating: 2,
  //     authorId: 2,
  //     genreId: 2,
  //     author: { name: "author" },
  //     genre: { name: "genre" },
  //   },
  //   {
  //     id: 6,
  //     name: "Book7",
  //     price: 700,
  //     img: "img2.jpg",
  //     rating: 1,
  //     authorId: 1,
  //     genreId: 1,
  //     author: { name: "author" },
  //     genre: { name: "genre" },
  //   },
  // ],
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
