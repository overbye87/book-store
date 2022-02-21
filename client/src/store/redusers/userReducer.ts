import {
  UserActionTypes,
  UserAction,
  IUserState,
  IUser,
} from "../../types/users";

const initialState: IUserState = {
  isAuth: false,
  user: {},
  error: null,
};

export const userReducer = (
  state = initialState,
  action: UserAction
): IUserState => {
  switch (action.type) {
    case UserActionTypes.SET_ISAUTH:
      return { ...state, isAuth: action.payload };
    case UserActionTypes.SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
