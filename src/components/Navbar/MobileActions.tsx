import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

interface MobileActionsProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileActions({
  mobileMenuOpen,
  setMobileMenuOpen,
}: MobileActionsProps) {
  const { toggleDarkMode, darkMode } = useTheme();

  return (
    <div className="flex md:hidden items-center space-x-3">
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-lg text-textMain-light dark:text-textMain-dark"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-amber-400" />
        ) : (
          <Moon className="w-5 h-5" />
        )}
      </button>

      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="p-2 rounded-lg text-textMain-light dark:text-textMain-dark"
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
