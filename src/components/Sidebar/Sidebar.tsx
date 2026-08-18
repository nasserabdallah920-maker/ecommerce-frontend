import { useState } from "react";
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import NavItems from "./NavItems";
import { SidebarItems,  adminSidebarItems } from "../../constants/NavLinks";
import type { RootState } from "../../Redux/store";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
   const userPayload =useSelector((state:RootState)=>state.authuser.initialState)
 
  const nav = userPayload.role=='admin'?adminSidebarItems:SidebarItems
  return (
    <aside
      className={`h-full bg-surface-light  dark:bg-surface-dark border-r border-gray-100 dark:border-gray-800 transition-all duration-300 flex flex-col justify-between p-4 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3.5 top-8 w-7 h-7 rounded-full bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark flex items-center justify-center shadow-md hover:bg-prime/10 transition-colors z-20"
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      <div className="space-y-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-prime dark:bg-prime-darkTheme flex items-center justify-center text-surface-light dark:text-bgMain-dark font-bold shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-extrabold text-textMain-light dark:text-textMain-dark tracking-tight whitespace-nowrap">
              Prime
              <span className="text-prime dark:text-prime-darkTheme">
                Store
              </span>
            </span>
          )}
        </div>
        <NavItems isCollapsed={isCollapsed} navItems={nav} />
      </div>
    </aside>
  );
}
