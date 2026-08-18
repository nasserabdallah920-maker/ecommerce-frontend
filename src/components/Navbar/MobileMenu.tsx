import { NavbarItems } from "../../constants/NavLinks";
import { Link } from "react-router-dom";
import { ShoppingBag, LogOut } from "lucide-react";
import { useLogout } from "../../hooks/useLogout";
import { useSelector } from "react-redux";
import type { RootState } from "../../Redux/store";

interface MobileActionsProps {
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileMenu({ setMobileMenuOpen }: MobileActionsProps) {
  const userPayload = useSelector(
    (state: RootState) => state.authuser.initialState,
  );

  const { handleLogout } = useLogout();

  return (
    <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-surface-light dark:bg-surface-dark px-4 pt-4 pb-6 space-y-4 transition-all duration-300">
      <div className="flex flex-col space-y-2">
        {NavbarItems.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            className="px-3 py-2 rounded-lg text-base font-medium text-textMain-light dark:text-textMain-dark hover:bg-prime-light dark:hover:bg-surface-light/10 hover:text-prime dark:hover:text-prime-darkTheme transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <button className="flex items-center space-x-2 text-base font-medium text-textMain-light dark:text-textMain-dark">
          <ShoppingBag className="w-5 h-5 text-prime dark:text-prime-darkTheme" />
          <span>Cart </span>
        </button>

        {userPayload?.token ? (
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleLogout();
            }}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </button>
        ) : (
          <Link
            to={"/login"}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg text-surface-light dark:text-bgMain-dark bg-prime dark:bg-prime-darkTheme hover:bg-prime-dark"
            onClick={() => setMobileMenuOpen(false)}
          >
            Log In
          </Link>
        )}
      </div>
    </div>
  );
}
