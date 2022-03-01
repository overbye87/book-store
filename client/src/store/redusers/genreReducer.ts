import { GenreAction, GenreActionTypes, IGenreState } from "../../types/genres";

const initialState: IGenreState = {
  genres: [
    // { id: 1, name: "Adventures" },
    // { id: 2, name: "Fairy tale" },
    // { id: 3, name: "Genre 3" },
    // { id: 4, name: "Genre 4" },
    // { id: 5, name: "Genre 5" },
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
