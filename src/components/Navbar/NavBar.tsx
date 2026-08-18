import { useState, useEffect } from "react";
import Logo from "../shared/Logo";
import Actions from "../shared/ActionsNav";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import MobileActions from "./MobileActions";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm" : "bg-surface-light dark:bg-surface-dark border-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          <Logo />
          <NavLinks />
          <SearchBar />
          <Actions />
          <MobileActions
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </div>
      </div>

      {mobileMenuOpen && <MobileMenu setMobileMenuOpen={setMobileMenuOpen} />}
    </header>
  );
}
