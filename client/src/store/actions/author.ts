import axios from "axios";
import { Dispatch } from "redux";

export const fetchAuthors = () => {
  return async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch({ type: "FETCH_AUTHORS" });
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users_authors"
      );
      dispatch({
        type: "FETCH_AUTHORS_SUCCESS",
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: "FETCH_AUTHORS_ERROR",
        payload: "An error occurred loading the list of authors",
      });
    }
  };
};

export const setSelectedAuthors = (id: number) => {
  return (dispatch: (arg0: { type: string; payload: number }) => void) => {
    dispatch({
      type: "SET_SELECTED_AUTHORS",
      payload: id,
    });
  };
};
