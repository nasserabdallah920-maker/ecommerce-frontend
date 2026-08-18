import { X, Save, Edit3 } from "lucide-react";
import type { ProfileHeaderProps } from "../interfaces";



export default function ProfileHeader({ isEditing, setIsEditing, onSave }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold text-textMain-light dark:text-textMain-dark">
          Account Settings
        </h1>
        <p className="text-sm text-textMain-light/70 dark:text-textMain-dark/70 mt-1">
          Manage your profile details and security settings.
        </p>
      </div>

      <div className="flex items-center gap-3">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-semibold text-textMain-light/70 dark:text-textMain-dark/70 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </button>
            <button
              onClick={onSave}
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-semibold text-surface-light dark:text-bgMain-dark bg-prime dark:bg-prime-darkTheme hover:bg-prime-dark dark:hover:bg-prime transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-semibold text-surface-light dark:text-bgMain-dark bg-prime dark:bg-prime-darkTheme hover:bg-prime-dark dark:hover:bg-prime transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
