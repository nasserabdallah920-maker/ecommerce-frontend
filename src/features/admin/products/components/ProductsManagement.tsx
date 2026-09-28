import {
  Package,
  Plus,
  Search,
  Filter,
  Layers,
  AlertCircle,

  Send,
} from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useProductManagement } from "../hooks/useProductManagement";
import ProductsList from "./ProductsList";
import Loading from "../../../../components/shared/loading";

export default function ProductsManagement() {
  const { getProducts, products, categories, searchProducts ,loading} =
    useProductManagement();

  const itemsStocked = products?.filter((e) => e.stock == 0);
  const [category, setCategory] = useState<string>();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);
  if(loading)return <Loading/>

  return (
    <div className="p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-textMain-light dark:text-textMain-dark">
              Products Management
            </h1>
            <p className="text-sm text-textMain-light/70 dark:text-textMain-dark/70 mt-1">
              Manage your store items, edit prices, track inventory, and delete
              outdated catalog items.
            </p>
          </div>

          <Link
            to={"/admin/add-product"}
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-semibold text-surface-light dark:text-bgMain-dark bg-prime dark:bg-prime-darkTheme hover:bg-prime-dark dark:hover:bg-prime transition-all duration-200 shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Product
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-textMain-light/60 dark:text-textMain-dark/60 uppercase">
                Total Items
              </p>
              <h3 className="text-2xl font-bold text-textMain-light dark:text-textMain-dark mt-1">
                {products?.length} Products
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-prime-light/40 dark:bg-bgMain-dark flex items-center justify-center text-prime dark:text-prime-darkTheme">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-textMain-light/60 dark:text-textMain-dark/60 uppercase">
                Active Categories
              </p>
              <h3 className="text-2xl font-bold text-textMain-light dark:text-textMain-dark mt-1">
                {categories?.length} Categories
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-prime-light/40 dark:bg-bgMain-dark flex items-center justify-center text-prime dark:text-prime-darkTheme">
              <Layers className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-textMain-light/60 dark:text-textMain-dark/60 uppercase">
                Out of Stock
              </p>
              <h3 className="text-2xl font-bold text-rose-500 mt-1">
                {itemsStocked?.length} Items
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <AlertCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm">

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-textMain-light/40 dark:text-textMain-dark/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span
              onClick={getProducts}
              className="p-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark text-textMain-light/70 dark:text-textMain-dark/70 hover:text-prime dark:hover:text-prime-darkTheme transition-colors cursor-pointer"
            >
              reset
            </span>
            <div className="relative">
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="appearance-none bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 pl-4 pr-9 py-2 rounded-xl text-sm font-semibold text-textMain-light/80 dark:text-textMain-dark/80 focus:outline-none cursor-pointer"
              >
                <option value="">Select Category</option>

                {categories?.map((cate) => (
                  <option value={cate._id}>{cate.name}</option>
                ))}
              </select>
              <Filter className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-textMain-light/40 dark:text-textMain-dark/40" />
            </div>
            <button
              onClick={() => searchProducts(category?category:'')}
              title="search"
              className="p-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark text-textMain-light/70 dark:text-textMain-dark/70 hover:text-prime dark:hover:text-prime-darkTheme transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {filteredProducts ? <ProductsList sampleProducts={filteredProducts} /> : <></>}
      </div>
    </div>
  );
}
