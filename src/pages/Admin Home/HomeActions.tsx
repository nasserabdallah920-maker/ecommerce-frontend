import { ArrowUpRight } from "lucide-react";

import { Link } from "react-router-dom";
import { Actions } from "../../constants/AdminHomeActions";

export default function HomeActions() {
  return (
    <div>
      <h2 className="text-xl font-bold text-textMain-light dark:text-textMain-dark mb-4">
        Quick Management
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {Actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              to={`/admin/${action.path}`}
              className="group p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-prime dark:hover:border-prime-darkTheme transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-prime-light/30 dark:bg-bgMain-dark text-prime dark:text-prime-darkTheme group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-textMain-light/40 dark:text-textMain-dark/40 group-hover:text-prime dark:group-hover:text-prime-darkTheme transition-colors" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-textMain-light dark:text-textMain-dark group-hover:text-prime dark:group-hover:text-prime-darkTheme transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 mt-0.5">
                  {action.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
