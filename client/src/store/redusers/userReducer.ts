import { UserActionTypes, UserAction, IUserState } from "../../types/users";

const initialState: IUserState = {
  isAuth: false,
  user: null,
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
    case UserActionTypes.SET_ISAUTHANDUSER:
      return {
        ...state,
        isAuth: action.payload.isAuth,
        user: action.payload.user,
      };
    default:
      return state;
  }
};
