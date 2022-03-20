import { Dispatch } from "redux";
import { IUser, UserAction, UserActionTypes } from "../../types/users";

//Action Creators
export const setIsAuthAndUserAction = (isAuth: boolean, user: IUser) => {
  return {
    type: UserActionTypes.SET_ISAUTHANDUSER,
    payload: { isAuth, user },
  };
};

export const setIsAuthAction = (isAuth: boolean) => {
  return {
    type: UserActionTypes.SET_ISAUTH,
    payload: isAuth,
  };
};

export const setUserAction = (user: IUser) => {
  return {
    type: UserActionTypes.SET_USER,
    payload: user,
  };
};
