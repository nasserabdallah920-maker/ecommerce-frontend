import { NavLink } from "react-router-dom";
import React from "react";
import { NavbarItems } from "../../constants/NavLinks";

const NavLinks = React.memo(function NavLinks() {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      {NavbarItems.map((link) => (
        <NavLink
          key={link.label}
          to={link.href}
          className={({ isActive }) =>
            `text-base font-medium transition-colors duration-200 relative py-1 group ${
              isActive
                ? "text-prime dark:text-prime-darkTheme"
                : "text-textMain-light dark:text-textMain-dark hover:text-prime dark:hover:text-prime-darkTheme"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {link.label}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-prime dark:bg-prime-darkTheme transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
});

export default NavLinks;
