export enum UserActionTypes {
  SET_ISAUTH = "SET_ISAUTH",
  SET_USER = "SET_USER",
}

interface ISetIsAuthAction {
  type: UserActionTypes.SET_ISAUTH;
  payload: boolean;
}

interface ISetUserAction {
  type: UserActionTypes.SET_USER;
  user: object;
}

export type UserAction = ISetIsAuthAction | ISetUserAction;

export interface IUserState {
  isAuth: boolean;
  user: object;
  error: null | string | object;
}
