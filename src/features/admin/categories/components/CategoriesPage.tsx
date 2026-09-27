import { useEffect, useState, useMemo } from "react";
import {
  Plus,
  Trash2,
  Edit,
  Image as ImageIcon,
  Search,
  Layers,
  FolderX,
} from "lucide-react";
import EmptyState from "../../../../components/shared/EmptyState";
import { useCategoriesManagement } from "../hooks/useCategoriesManagement";
import { Link } from "react-router-dom";
import Loading from "../../../../components/shared/loading";

export default function CategoriesPage() {
  const { categories, loading, getAllCategories, deleteCategory } =
    useCategoriesManagement();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  const filteredCategories = useMemo(() => {
    return categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [categories, searchQuery]);
  if (loading) return <Loading />;
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-prime/10 text-prime">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-textMain-light dark:text-textMain-dark">
                Category Management
              </h1>
              <p className="text-xs text-textMain-light/50 dark:text-textMain-dark/50 mt-1">
                Add and edit main categories
              </p>
            </div>
          </div>
        </div>
        
        <Link to="/admin/categories/create" className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-semibold text-white bg-prime hover:bg-prime/90 active:scale-95 transition-all text-sm shadow-lg shadow-prime/25 cursor-pointer">
          <Plus className="w-5 h-5" />
          <span>Add New Category</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-textMain-light/40 dark:text-textMain-dark/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a category..."
            className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 text-sm text-textMain-light dark:text-textMain-dark placeholder:text-textMain-light/40 focus:outline-none focus:border-prime transition-colors"
          />
        </div>
        <div className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 bg-surface-light dark:bg-surface-dark px-3 py-2 rounded-xl border border-gray-100 dark:border-gray-800">
          Total Categories:{" "}
          <span className="font-bold text-prime">
            {filteredCategories.length}
          </span>
        </div>
      </div>

      {categories.length === 0 ? (
        <EmptyState
          icon={<FolderX className="w-12 h-12" />}
          title="No Categories"
          description="The Categories list is currently empty."
        />
      ) : filteredCategories.length === 0 ? (
        <EmptyState
          icon={<FolderX className="w-12 h-12" />}
          title={searchQuery ? "No search results match" : "No categories added currently"}
          description={searchQuery ? "Try searching with different keywords" : "Start by creating a new category to display here"}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCategories.map((category) => (
            <div
              key={category._id}
              className="group relative flex flex-col justify-between rounded-3xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="relative w-full h-40 rounded-2xl overflow-hidden bg-bgMain-light dark:bg-bgMain-dark border border-gray-100 dark:border-gray-800/80 mb-4">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-textMain-light/30 dark:text-textMain-dark/30 gap-1">
                      <ImageIcon className="w-8 h-8" />
                      <span className="text-[10px]">No image</span>
                    </div>
                  )}

                  <div className="absolute top-3 left-3 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link
                      to={`/admin/categories/edit/${category._id}`}
                      className="p-2 rounded-xl bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md text-textMain-light dark:text-textMain-dark hover:text-prime transition-colors shadow-sm cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => {
                        if (category._id) deleteCategory(category._id);
                      }}
                      className="p-2 rounded-xl bg-surface-light/90 dark:bg-surface-dark/90 backdrop-blur-md text-rose-500 hover:bg-rose-500 hover:text-white transition-colors shadow-sm cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="font-bold text-base text-textMain-light dark:text-textMain-dark line-clamp-1 mb-1">
                  {category.name}
                </h3>
                <p className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 line-clamp-2 leading-relaxed">
                  {category.description ||
                    "No specific description for this category."}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
