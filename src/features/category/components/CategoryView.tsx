import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";

import Products from "../../../components/shared/Products";
import { useCategoryDetails } from "../../../hooks/useCategoryDetails";
import CategoryInfo from "./CategoryInfo";
import { useEffect } from "react";

export default function CategoryView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { category, productsByCategory, loading, error, fetchCategory } =
    useCategoryDetails();
  useEffect(() => {
    if (id) fetchCategory(id);
  }, [fetchCategory,id]);

  return (
    <div className="min-h-screen bg-bgMain-light dark:bg-bgMain-dark transition-colors duration-300 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/categories"
          className="inline-flex items-center text-sm font-semibold text-textMain-light/60 dark:text-textMain-dark/60 hover:text-prime dark:hover:text-prime-darkTheme transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Categories
        </Link>

        {loading && (
          <div className="bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-75">
            <Loader2 className="w-8 h-8 animate-spin text-prime dark:text-prime-darkTheme mb-3" />
            <p className="text-sm font-semibold text-textMain-light/60 dark:text-textMain-dark/60">
              Loading category details...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl p-8 text-center max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-textMain-light dark:text-textMain-dark mb-2">
              Error Loading Category
            </h3>
            <p className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 mb-6">
              {error}
            </p>
            <button
              onClick={() => navigate("/categories")}
              className="px-5 py-2.5 rounded-xl bg-prime dark:bg-prime-darkTheme text-surface-light dark:text-bgMain-dark font-bold text-xs"
            >
              Back to List
            </button>
          </div>
        )}

        {!loading && !error && category && <CategoryInfo category={category} />}
      </div>
      <div className=" pt-7">
        <Products id={id} productsShow={productsByCategory} loading={loading} />
      </div>
    </div>
  );
}
