import { KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SecuritySection() {
  const nav=useNavigate()
  return (
    <div className="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="p-3.5 rounded-xl bg-prime-light/30 dark:bg-bgMain-dark text-prime dark:text-prime-darkTheme">
          <KeyRound className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-textMain-light dark:text-textMain-dark">
            Password & Security
          </h3>
          <p className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 mt-0.5">
            Ensure your account is using a strong password to stay protected.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={()=>{nav('/password')}}
        className="w-full sm:w-auto px-4 py-2.5 rounded-xl font-semibold text-prime dark:text-prime-darkTheme bg-prime-light/30 dark:bg-bgMain-dark hover:bg-prime/10 dark:hover:bg-gray-800 border border-prime/20 dark:border-prime-darkTheme/20 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
      >
        Change Password
      </button>
    </div>
  );
}
