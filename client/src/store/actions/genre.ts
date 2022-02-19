import axios from "axios";
import { Dispatch } from "redux";
import { GenreAction, GenreActionTypes } from "../../types/genres";

export const fetchGenres = () => {
  return async (dispatch: Dispatch<GenreAction>) => {
    try {
      dispatch({ type: GenreActionTypes.FETCH_GENRES });
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users_genres"
      );
      dispatch({
        type: GenreActionTypes.FETCH_GENRES_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: GenreActionTypes.FETCH_GENRES_ERROR,
        payload: "An error occurred loading the list of genres",
      });
    }
  };
};

export const setSelectedGenres = (id: number) => {
  return (dispatch: Dispatch<GenreAction>) => {
    dispatch({
      type: GenreActionTypes.SET_SELECTED_GENRES,
      payload: id,
    });
  };
};
