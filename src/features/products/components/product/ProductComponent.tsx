import { useParams, Link } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useProductDetails } from "../../hooks/useProductDetails";

import Loading from "../../../../components/shared/loading";
import ProductDetails from "./ProductDetails";
export default function ProductComponent() {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProductDetails(id);

  if (loading) {
    return <Loading />;
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="p-4 rounded-full bg-red-500/10 text-red-500 w-16 h-16 mx-auto flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-textMain-light dark:text-textMain-dark mb-2">
          Product Not Found
        </h2>
        <p className="text-textMain-light/60 dark:text-textMain-dark/60 text-sm mb-6">
          {error || "The product you are looking for does not exist."}
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center px-6 py-3 rounded-xl font-bold text-sm bg-prime dark:bg-prime-darkTheme text-surface-light dark:text-bgMain-dark"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgMain-light dark:bg-bgMain-dark transition-colors duration-300 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link
          to="/"
          className="inline-flex items-center text-sm font-semibold text-textMain-light/60 dark:text-textMain-dark/60 hover:text-prime dark:hover:text-prime-darkTheme transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
        </Link>

        <ProductDetails product={product} />
      </div>
    </div>
  );
}
