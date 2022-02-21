import { Dispatch } from "redux";
import { IUser, UserAction, UserActionTypes } from "../../types/users";

export const setIsAuthAction = (isAuth: boolean) => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: UserActionTypes.SET_ISAUTH,
      payload: isAuth,
    });
  };
};

export const setUserAction = (user: IUser) => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: UserActionTypes.SET_USER,
      payload: user,
    });
  };
};
