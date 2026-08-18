import { ArrowRight, LayoutGrid, FolderX } from "lucide-react";
import { Link } from "react-router-dom";
import EmptyState from "./EmptyState";
import type { ICategory } from "../../features/category/category.interfaces";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
export default function Categories({
  categories,
  loading,
}: {
  categories: ICategory[];
  loading: boolean;
}) {
  const location = window.location.pathname;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-prime dark:text-prime-darkTheme" />
            {location == "/" ? "Top Categories" : "All Categories"}
          </h2>
          <p className="text-sm text-textMain-light/60 dark:text-textMain-dark/60 mt-1">
            Browse our wide range of categories
          </p>
        </div>
        {location == "/" && (
          <Link
            to="/categories"
            className="inline-flex items-center text-sm font-bold text-prime dark:text-prime-darkTheme hover:underline"
          >
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-64 rounded-2xl bg-surface-light dark:bg-surface-dark animate-pulse border border-gray-100 dark:border-gray-800"
            />
          ))}
        </div>
      ) : categories.length === 0 ? (
        <EmptyState
          icon={<FolderX className="w-12 h-12" />}
          title="No Categories Available"
          description="There are no categories available at the moment."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category: ICategory) => {
            return (
              <Link
                key={category._id}
                to={`/category/${category._id}`}
                className="group rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="w-full h-44 bg-bgMain-light dark:bg-bgMain-dark relative overflow-hidden">
                  <img
                    src={baseUrl + category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-5 py-2.5 rounded-xl font-bold text-xs bg-surface-light text-textMain-light shadow-lg hover:scale-105 transition-transform">
                      Explore Products
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className="font-bold text-lg text-textMain-light dark:text-textMain-dark line-clamp-1 mb-1 group-hover:text-prime dark:group-hover:text-prime-darkTheme transition-colors"
                      title={category.name}
                    >
                      {category.name}
                    </h3>

                    {category.description && (
                      <p className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center text-xs font-semibold text-prime dark:text-prime-darkTheme pt-3 border-t border-gray-100 dark:border-gray-800/60 mt-3">
                    Browse Category{" "}
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
