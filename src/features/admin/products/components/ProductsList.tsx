import { Edit3, Eye, Tag, Trash2 } from "lucide-react";
import type { IProduct } from "../../../products/products.interfaces";
import { useProductManagement } from "../hooks/useProductManagement";
import { useNavigate } from "react-router-dom";

export default function ProductsList({
  sampleProducts,

}: {
  sampleProducts: IProduct[];

}) {
    const {removeProduct}=useProductManagement()
  const stockStyle = (stock: number) => {
    if (stock < 20 && stock !== 0) {
      return "lowStock";
    } else if (stock > 20) {
      return "inStock";
    } else {
      return "outOfStock";
    }
  };
  const getStatusBadge = {
    inStock: ` bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-emerald-800/40`,
    lowStock: ` bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-800/40`,
    outOfStock: ` bg-rose-100 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-200/50 dark:border-rose-800/40`,
  };

  const nav=useNavigate()
  return (
    <div>

      <div>
        <h2 className="text-xl font-bold text-textMain-light dark:text-textMain-dark mb-4">
          Products List
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sampleProducts.map((product) => (
            <div
              key={product._id}
              className="group p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-prime/50 dark:hover:border-prime-darkTheme/50 transition-all duration-200 flex flex-col justify-between"
            >
              <div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-textMain-light/60 dark:text-textMain-dark/60 uppercase flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                  </span>
                  <span
                    className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusBadge[stockStyle(product.stock)]}`}
                  >
                    {stockStyle(product.stock)}
                  </span>
                </div>


                <h3 className="font-bold text-lg text-textMain-light dark:text-textMain-dark group-hover:text-prime dark:group-hover:text-prime-darkTheme transition-colors line-clamp-1">
                  {product.title}
                </h3>

                <div className="mt-3 flex items-baseline justify-between">
                  <span className="text-2xl font-extrabold text-textMain-light dark:text-textMain-dark">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs font-medium text-textMain-light/60 dark:text-textMain-dark/60">
                    Stock:{" "}
                    <strong className="text-textMain-light dark:text-textMain-dark">
                      {product.stock}
                    </strong>{" "}
                    units
                  </span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between gap-2">
                <button
                onClick={()=>nav(`/product/${product._id}`)}
                  title="View Product"
                  className="p-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark text-textMain-light/70 dark:text-textMain-dark/70 hover:text-prime dark:hover:text-prime-darkTheme transition-colors cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                  
                onClick={()=>nav(`/admin/edit-product/${product._id}`)}
                    title="Edit Product"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-prime dark:text-prime-darkTheme bg-prime-light/30 dark:bg-bgMain-dark border border-prime/20 dark:border-prime-darkTheme/20 hover:bg-prime/10 transition-all cursor-pointer active:scale-95"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      removeProduct(product._id);
                    }}
                    title="Delete Product"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-100/60 dark:bg-rose-950/40 border border-rose-200/50 dark:border-rose-800/40 hover:bg-rose-200/60 dark:hover:bg-rose-900/40 transition-all cursor-pointer active:scale-95"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
