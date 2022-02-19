import axios from "axios";
import { Dispatch } from "redux";
import { AuthorAction, AuthorActionTypes } from "../../types/authors";

export const fetchAuthors = () => {
  return async (dispatch: Dispatch<AuthorAction>) => {
    try {
      dispatch({ type: AuthorActionTypes.FETCH_AUTHORS });
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users_authors"
      );
      dispatch({
        type: AuthorActionTypes.FETCH_AUTHORS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: AuthorActionTypes.FETCH_AUTHORS_ERROR,
        payload: "An error occurred loading the list of authors",
      });
    }
  };
};

export const setSelectedAuthors = (id: number) => {
  return (dispatch: Dispatch<AuthorAction>) => {
    dispatch({
      type: AuthorActionTypes.SET_SELECTED_AUTHORS,
      payload: id,
    });
  };
};