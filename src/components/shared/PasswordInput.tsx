import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  label: string;
  id: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function PasswordInput({
  label,
  id,
  placeholder = "••••••••",
  value,
  required = false,
  onChange,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-textMain-light dark:text-textMain-dark mb-2"
      >
        {label}
      </label>

      <div className="relative flex items-center">
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 dark:border-gray-800 bg-bgMain-light dark:bg-bgMain-dark text-textMain-light dark:text-textMain-dark placeholder-textMain-light/40 dark:placeholder-textMain-dark/40 focus:ring-2 focus:ring-prime dark:focus:ring-prime-darkTheme focus:border-transparent transition-all outline-none"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3.5 text-textMain-light/50 dark:text-textMain-dark/50 hover:text-prime dark:hover:text-prime-darkTheme transition-colors focus:outline-none"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
