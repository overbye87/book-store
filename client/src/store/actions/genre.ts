import axios from "axios";
import { Dispatch } from "redux";

export const fetchGenres = () => {
  return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch({ type: "FETCH_GENRES" });
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users_genres"
      );
      dispatch({
        type: "FETCH_GENRES_SUCCESS",
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: "FETCH_GENRES_ERROR",
        payload: "An error occurred loading the list of genres",
      });
    }
  };
};
