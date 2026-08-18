import {
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { useChangePassword } from "./hooks/useChangePassword";

export default function ChangePassword() {
  const {
    status,
    setFormData,
    setShowConfirm,
    setShowNew,
    setShowOld,
    showConfirm,
    showNew,
    showOld,
    handleChange,
    handleSubmit,
    formData,
  } = useChangePassword();

  
  return (

    <div className="min-h-screen bg-bgMain-light dark:bg-bgMain-dark p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="p-2.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-textMain-light/70 dark:text-textMain-dark/70 hover:text-prime dark:hover:text-prime-darkTheme transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-extrabold text-textMain-light dark:text-textMain-dark">
              Change Password
            </h1>
            <p className="text-sm text-textMain-light/70 dark:text-textMain-dark/70 mt-0.5">
              Update your password to keep your account secure.
            </p>
          </div>
        </div>

        <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 p-6 sm:p-8 shadow-sm">
          {status && (
            <div
              className={`p-4 mb-6 rounded-xl flex items-center gap-3 text-sm font-semibold transition-all ${
                status.type === "success"
                  ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40"
                  : "bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/40"
              }`}
            >
              {status.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}
              <span>{status.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-textMain-light/60 dark:text-textMain-dark/60 uppercase mb-2">
                Current Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-textMain-light/40 dark:text-textMain-dark/40">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showOld ? "text" : "password"}
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                  className="w-full pl-11 pr-11 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm font-medium focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-textMain-light/40 dark:text-textMain-dark/40 hover:text-textMain-light dark:hover:text-textMain-dark transition-colors cursor-pointer"
                >
                  {showOld ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <hr className="border-gray-100 dark:border-gray-800/80 my-2" />
            <div>
              <label className="block text-xs font-semibold text-textMain-light/60 dark:text-textMain-dark/60 uppercase mb-2">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-textMain-light/40 dark:text-textMain-dark/40">
                  <KeyRound className="w-5 h-5" />
                </div>
                <input
                  type={showNew ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full pl-11 pr-11 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm font-medium focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-textMain-light/40 dark:text-textMain-dark/40 hover:text-textMain-light dark:hover:text-textMain-dark transition-colors cursor-pointer"
                >
                  {showNew ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-textMain-light/60 dark:text-textMain-dark/60 uppercase mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-textMain-light/40 dark:text-textMain-dark/40">
                  <KeyRound className="w-5 h-5" />
                </div>
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter new password"
                  className="w-full pl-11 pr-11 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm font-medium focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-textMain-light/40 dark:text-textMain-dark/40 hover:text-textMain-light dark:hover:text-textMain-dark transition-colors cursor-pointer"
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="pt-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    oldPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  })
                }
                className="px-5 py-2.5 rounded-xl font-semibold text-textMain-light/70 dark:text-textMain-dark/70 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200 active:scale-95 cursor-pointer text-sm"
              >
                Reset
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl font-semibold text-surface-light dark:text-bgMain-dark bg-prime dark:bg-prime-darkTheme hover:bg-prime-dark dark:hover:bg-prime transition-all duration-200 shadow-sm active:scale-95 cursor-pointer text-sm"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
