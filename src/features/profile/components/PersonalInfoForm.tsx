import { User, Mail, Phone } from "lucide-react";
import type { PersonalInfoFormProps } from "../interfaces";




export default function PersonalInfoForm({ form, isEditing, onChange }: PersonalInfoFormProps) {

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm space-y-6">
      <h2 className="text-lg font-bold text-textMain-light dark:text-textMain-dark border-b border-gray-100 dark:border-gray-800 pb-4">
        Personal Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        <div>
          <label className="block text-xs font-semibold text-textMain-light/60 dark:text-textMain-dark/60 uppercase mb-2">
            First Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-textMain-light/40 dark:text-textMain-dark/40">
              <User className="w-5 h-5" />
            </div>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              disabled={!isEditing}
              onChange={(e) => onChange(e.target.name, e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm font-medium focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        
        <div>
          <label className="block text-xs font-semibold text-textMain-light/60 dark:text-textMain-dark/60 uppercase mb-2">
            Last Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-textMain-light/40 dark:text-textMain-dark/40">
              <User className="w-5 h-5" />
            </div>
            <input
              type="text"
              name="lastName"
              disabled={!isEditing}
              value={form.lastName}
              onChange={(e) => onChange(e.target.name, e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm font-medium focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        
        <div>
          <label className="block text-xs font-semibold text-textMain-light/60 dark:text-textMain-dark/60 uppercase mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-textMain-light/40 dark:text-textMain-dark/40">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              name="email"
              disabled={!isEditing}
              value={form.email}
              onChange={(e) => onChange(e.target.name, e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm font-medium focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        
        <div>
          <label className="block text-xs font-semibold text-textMain-light/60 dark:text-textMain-dark/60 uppercase mb-2">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-textMain-light/40 dark:text-textMain-dark/40">
              <Phone className="w-5 h-5" />
            </div>
            <input
              type="text"
              name="phoneNumber"
              disabled={!isEditing}
              value={form.phoneNumber}
              onChange={(e) => onChange(e.target.name, e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm font-medium focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
