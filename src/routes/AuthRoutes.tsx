import LoginPage from "../features/auth/login/components/LoginPage";
import SignupPage from "../features/auth/signup/components/SignupPage";

export const AuthRoutes = [
  { path: "login", element: <LoginPage /> },
  { path: "signup", element: <SignupPage /> },
];
