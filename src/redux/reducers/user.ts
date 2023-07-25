import { User } from "../../services/types";

// type for user
export type UserState = {
  user: User | null;
};

// initial value of any user
export const DEFAULT_USER_STATE: UserState = {
  user: null,
};

// all possible UserActions
export enum UserActions {
  Login = "user/LOGIN",
  Logout = "user/LOGOUT",
  SignUp = "user/SIGN_UP",
}

interface LoginAction {
  type: UserActions.Login;
  payload: { user: User };
}

interface LogoutAction {
  type: UserActions.Logout;
}

interface SignUpAction {
  type: UserActions.SignUp;
  payload: { user: User };
}

export const userStateReducer = (
  state: UserState = DEFAULT_USER_STATE,
  action: LoginAction | LogoutAction | SignUpAction
) => {
  switch (action.type) {
    case UserActions.Login:
      console.log(state);
      return {
        ...state,
        user: action.payload.user,
      };
    case UserActions.SignUp:
      return {
        ...state,
        user: action.payload.user,
      };
    case UserActions.Logout:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
