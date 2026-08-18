import { Folder, FileText } from "lucide-react";
import type { ICategory } from "../category.interfaces";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface CategoryInfoProps {
  category: ICategory;
}

export default function CategoryInfo({ category }: CategoryInfoProps) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
      <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-prime/10 text-prime dark:text-prime-darkTheme">
            <Folder className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-textMain-light dark:text-textMain-dark">
              Category Details
            </h1>
            <p className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 mt-0.5">
              Viewing information for category
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">

        <div className="md:col-span-5 flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-textMain-light/70 dark:text-textMain-dark/70">
            Category Image
          </span>
          <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-bgMain-light dark:bg-bgMain-dark">
            <img
              src={baseUrl + category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-7 space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-textMain-light/70 dark:text-textMain-dark/70 mb-2">
              Category Name
            </label>
            <div className="p-3.5 rounded-2xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-base font-bold">
              {category.name}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-textMain-light/70 dark:text-textMain-dark/70 mb-2">
              <FileText className="w-3.5 h-3.5" /> Description
            </label>
            <div className="p-4 rounded-2xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light/80 dark:text-textMain-dark/80 text-sm leading-relaxed min-h-25">
              {category.description ||
                "No description provided for this category."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
