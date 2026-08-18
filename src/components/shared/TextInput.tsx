import { Building2 } from "lucide-react";
import React from "react";
type Props = {
  label: string;
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: string;
};

export default function TextInput({
  label,
  id,
  type = "text",
  placeholder,
  value,
  required = false,
  onChange,
}: Props) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-textMain-light dark:text-textMain-dark mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <Building2 className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-bgMain-light dark:bg-bgMain-dark text-textMain-light dark:text-textMain-dark placeholder-textMain-light/40 dark:placeholder-textMain-dark/40 focus:ring-2 focus:ring-prime dark:focus:ring-prime-darkTheme focus:border-transparent transition-all outline-none"
        />
      </div>
    </div>
  );
}
