export enum UserActionTypes {
  SET_ISAUTH = "SET_ISAUTH",
  SET_USER = "SET_USER",
  SET_ISAUTHANDUSER = "SET_ISAUTHANDUSER",
}

interface ISetIsAuthAction {
  type: UserActionTypes.SET_ISAUTH;
  payload: boolean;
}

interface ISetUserAction {
  type: UserActionTypes.SET_USER;
  payload: IUser;
}

interface ISetIsAuthAndUserAction {
  type: UserActionTypes.SET_ISAUTHANDUSER;
  payload: { isAuth: boolean; user: IUser };
}

export type UserAction =
  | ISetIsAuthAction
  | ISetUserAction
  | ISetIsAuthAndUserAction;

export interface IUser {
  id: number;
  email: string;
  name: string;
  role: string;
  img: string;
}

export interface IUserState {
  isAuth: boolean;
  user: null | IUser;
  error: null | string | object;
}
