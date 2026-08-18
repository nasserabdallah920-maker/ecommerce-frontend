
import { NavLink } from "react-router-dom";
import type { SidebarItem } from "../../constants/NavLinks";

export default function NavItems({isCollapsed , navItems}:{isCollapsed:boolean,navItems: SidebarItem[]}) {

  return (
           <nav className="space-y-1.5">
            {navItems.map((item: SidebarItem) => {
              const Icon = item.icon;
              const toPath = item.path === "/" ? "/" : `${item.path}`;
              return (
                <NavLink
                  key={item.path}
                  to={toPath}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? "bg-prime text-surface-light dark:bg-prime-darkTheme dark:text-bgMain-dark shadow-md font-bold"
                        : "text-textMain-light/70 dark:text-textMain-dark/70 hover:bg-bgMain-light dark:hover:bg-bgMain-dark hover:text-textMain-light dark:hover:text-textMain-dark"
                    }`
                  }
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && (
                    <span className="whitespace-nowrap">{item.label}</span>
                  )}
                </NavLink>
              );
            })}
          </nav>
  )
}
