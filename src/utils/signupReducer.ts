import type {
  ISignupData,
  SignupAction,
} from "../features/auth/auth.interfaces";

export const signupReducer = (
  state: ISignupData,
  action: SignupAction,
): ISignupData => {
  switch (action.type) {
    case "firstName":
      return { ...state, firstName: action.value };
    case "lastName":
      return { ...state, lastName: action.value };
    case "email":
      return { ...state, email: action.value };
    case "phone":
      return { ...state, phoneNumber: action.value };
    case "password":
      return { ...state, password: action.value };
    default:
      return state;
  }
};
