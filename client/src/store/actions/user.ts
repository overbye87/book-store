import { Dispatch } from "redux";
import { UserAction, UserActionTypes } from "../../types/users";

export const setIsAuthAction = (isAuth: boolean) => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: UserActionTypes.SET_ISAUTH,
      payload: isAuth,
    });
  };
};
