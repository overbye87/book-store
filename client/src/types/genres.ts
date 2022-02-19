export interface IGenreState {
  genres: any[];
  loading: boolean;
  selectedGenres: { id: number | null };
  error: null | string | object;
}
export enum GenreActionTypes {
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
export type GenreAction =
  | IFetchGenresAction
  | IFetchGenresSuccessAction
  | IFetchGenresErrorAction
  | ISetSelectedGenres;
