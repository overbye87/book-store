import { Dispatch } from "redux";
import { IUser, UserAction, UserActionTypes } from "../../types/users";

export const setIsAuthAndUserAction = (isAuth: boolean, user: IUser) => {
  return (dispatch: Dispatch<UserAction>) => {
    dispatch({
      type: UserActionTypes.SET_ISAUTHANDUSER,
      payload: { isAuth, user },
    });
  };
};

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
