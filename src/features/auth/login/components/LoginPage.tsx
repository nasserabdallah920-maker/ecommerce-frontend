import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-bgMain-light dark:bg-bgMain-dark flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md border border-gray-100 dark:border-gray-800 shadow-xl rounded-2xl p-8 transition-all duration-300">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-textMain-light dark:text-textMain-dark">
          Welcome back
        </h2>
        <LoginForm />
        <p className="mt-8 text-center text-sm text-textMain-light/70 dark:text-textMain-dark/70">
          Don't have an account?
          <Link
            to="/signup"
            className="text-prime dark:text-prime-darkTheme hover:underline font-bold transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
