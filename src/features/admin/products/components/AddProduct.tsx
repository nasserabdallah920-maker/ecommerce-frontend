import { ArrowLeft } from "lucide-react";
import AddProductForm from "./AddProductForm";

export default function AddProductPage() {
  return (
    <div className="min-h-screen bg-bgMain-light dark:bg-bgMain-dark p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-6">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-2.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-textMain-light dark:text-textMain-dark hover:border-prime dark:hover:border-prime-darkTheme transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-textMain-light dark:text-textMain-dark">
                Add New Product
              </h1>
              <p className="text-xs sm:text-sm text-textMain-light/70 dark:text-textMain-dark/70">
                Fill the data below to add a new product.
              </p>
            </div>
          </div>
        </div>

        <AddProductForm />
      </div>
    </div>
  );
}
