import { Moon, Sun, User } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { LogOut } from "lucide-react";
import type { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";

export default function Actions() {
  const { toggleDarkMode, darkMode } = useTheme();
  const userPayload = useSelector(
    (state: RootState) => state.authuser.initialState,
  );

  const { handleLogout } = useLogout();
  return (
    <div className="hidden md:flex items-center space-x-5">
      <button
        onClick={toggleDarkMode}
        aria-label="Toggle Theme"
        className="p-2.5 rounded-xl text-textMain-light dark:text-textMain-dark hover:bg-prime-light dark:hover:bg-surface-light/10 transition-colors duration-200 focus:outline-none"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-amber-400" />
        ) : (
          <Moon className="w-5 h-5 text-textMain-light" />
        )}
      </button>

      {userPayload?.token ? (
        <>
          {" "}
          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-xl text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </button>
          <Link
            to={"/profile"}
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-xl text-surface-light dark:text-bgMain-dark bg-prime dark:bg-prime-darkTheme hover:bg-prime-dark dark:hover:bg-prime transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </Link>
        </>
      ) : (
        <Link
          to={"/login"}
          className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold rounded-xl text-surface-light dark:text-bgMain-dark bg-prime dark:bg-prime-darkTheme hover:bg-prime-dark dark:hover:bg-prime transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
        >
          <User className="w-4 h-4 mr-2" />
          Log In
        </Link>
      )}
    </div>
  );
}
