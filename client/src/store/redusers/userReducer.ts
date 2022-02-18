import { UserActionTypes, UserAction, IUserState } from "../../types/users";

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
      console.log(state.isAuth);
      return { ...state, isAuth: action.payload };
    case UserActionTypes.SET_USER:
      return { error: null, user: {}, isAuth: true };
    default:
      return state;
  }
};
