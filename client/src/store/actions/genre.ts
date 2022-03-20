import axios from "axios";
import { Dispatch } from "redux";
import { $host } from "../../http";
import { GenreAction, GenreActionTypes } from "../../types/genres";

//Thunks
export const fetchGenres = () => {
  return async (dispatch: Dispatch<GenreAction>) => {
    try {
      dispatch({ type: GenreActionTypes.FETCH_GENRES });
      const response = await $host.get("api/genre");
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

//Action Creators
export const setSelectedGenres = (id: number) => {
  return {
    type: GenreActionTypes.SET_SELECTED_GENRES,
    payload: id,
  };
};
