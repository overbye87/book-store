interface IGenreState {
  genres: any[];
  loading: boolean;
  selectedGenres: { id: number | null };
  error: null | string | object;
}
enum GenreActionTypes {
  FETCH_GENRES = "FETCH_GENRES",
  FETCH_GENRES_SUCCESS = "FETCH_GENRES_SUCCESS",
  FETCH_GENRES_ERROR = "FETCH_GENRES_ERROR",
  SET_SELECTED_GENRES = "SET_SELECTED_GENRES",
}

interface IFetchGenresAction {
  type: GenreActionTypes.FETCH_GENRES;
}
interface IFetchGenresSuccessAction {
  type: GenreActionTypes.FETCH_GENRES_SUCCESS;
  payload: any[];
}
interface IFetchGenresErrorAction {
  type: GenreActionTypes.FETCH_GENRES_ERROR;
  payload: string | object;
}
interface ISetSelectedGenres {
  type: GenreActionTypes.SET_SELECTED_GENRES;
  payload: number;
}
type GenreAction =
  | IFetchGenresAction
  | IFetchGenresSuccessAction
  | IFetchGenresErrorAction
  | ISetSelectedGenres;

const initialState = {
  genres: [
    { id: 1, name: "Adventures" },
    { id: 2, name: "Fairy tale" },
    { id: 3, name: "Genre 3" },
    { id: 4, name: "Genre 4" },
    { id: 5, name: "Genre 5" },
  ],
  selectedGenres: { id: null },
  loading: false,
  error: null,
};

export const genreReducer = (
  state = initialState,
  action: GenreAction
): IGenreState => {
  switch (action.type) {
    case GenreActionTypes.FETCH_GENRES:
      return { ...state, loading: true, error: null, genres: [] };
    case GenreActionTypes.FETCH_GENRES_SUCCESS:
      return { ...state, loading: false, error: null, genres: action.payload };
    case GenreActionTypes.FETCH_GENRES_ERROR:
      return { ...state, loading: false, error: action.payload, genres: [] };
    case GenreActionTypes.SET_SELECTED_GENRES:
      return { ...state, selectedGenres: { id: action.payload } };
    default:
      return state;
  }
};
