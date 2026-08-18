import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-bgMain-light dark:bg-bgMain-dark flex items-center justify-center p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-lg w-full p-8 sm:p-10 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="py-2">
          <span className="text-7xl sm:text-8xl font-black tracking-tight text-prime dark:text-prime-darkTheme select-none drop-shadow-sm">
            404
          </span>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-textMain-light dark:text-textMain-dark tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-textMain-light/70 dark:text-textMain-dark/70 leading-relaxed max-w-sm mx-auto">
            Sorry, the page you are looking for doesn't exist, has been removed,
            or is temporarily unavailable.
          </p>
        </div>
        <div className="pt-2 max-w-xs mx-auto">
          <button
            onClick={() => nav("/")}
            className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-surface-light dark:text-bgMain-dark bg-prime dark:bg-prime-darkTheme hover:bg-prime-dark dark:hover:bg-prime transition-all duration-200 shadow-sm active:scale-95 cursor-pointer text-sm gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </div>
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800/60">
          <p className="text-xs text-textMain-light/40 dark:text-textMain-dark/40">
            PrimeStore • Error 404
          </p>
        </div>
      </div>
    </div>
  );
}
