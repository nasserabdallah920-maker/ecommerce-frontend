import {
  DollarSign,
  FileText,
  ImageIcon,
  Package,
  PlusCircle,
  Tag,
  UploadCloud,
  FolderTree,
  ChevronDown,
} from "lucide-react";
import { useAddProduct } from "../hooks/useAddProduct";
import { useEffect } from "react";
import Loading from "../../../../components/shared/loading";
export default function AddProductForm() {
  const {
    price,
    stock,
    title,
    categories,
    getCategories,
    setCategory,
    reset,
    description,
    setDescription,
    setImages,
    setPrice,
    setStock,
    setTitle,
    addProduct,
    loading,
  } = useAddProduct();
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  useEffect(() => {
    if (categories) setCategory(categories[0]._id);
  }, [categories, setCategory]);

  if (loading) return <Loading />;
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addProduct();
      }}
      className="p-6 sm:p-8 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-xl space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
            <Tag className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
            Product Name (Title)
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Example: Noise cancelling wireless headphones"
            className="w-full px-4 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm placeholder-textMain-light/40 dark:placeholder-textMain-dark/40 focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
            <FolderTree className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
            Category (Category)
          </label>
          <div className="relative">
            <select
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm appearance-none focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors cursor-pointer"
            >
              {categories?.map((cate) => (
                <option value={cate._id}>{cate.name}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-textMain-light/40 dark:text-textMain-dark/40" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
            Price (Price)
          </label>
          <div className="relative">
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="0.00"
              className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm placeholder-textMain-light/40 dark:placeholder-textMain-dark/40 focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-textMain-light/40 dark:text-textMain-dark/40">
              EGP
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
            <Package className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
            Stock Quantity (Stock)
          </label>
          <input
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            type="number"
            placeholder="10"
            className="w-full px-4 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm placeholder-textMain-light/40 dark:placeholder-textMain-dark/40 focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
          <FileText className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
          Product Description (Description)
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Write a comprehensive description of the product..."
          className="w-full px-4 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm placeholder-textMain-light/40 dark:placeholder-textMain-dark/40 focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors resize-none"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
          Product Image (Product Image)
        </label>

        <div className="relative border-2 border-dashed border-gray-200 dark:border-gray-800 hover:border-prime dark:hover:border-prime-darkTheme rounded-2xl p-6 text-center bg-bgMain-light/50 dark:bg-bgMain-dark/50 transition-colors cursor-pointer group">
          <input
            onChange={(e) => {
              if (e.target.files) {
                setImages(Array.from(e.target.files));
              }
            }}
            multiple
            type="file"
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="space-y-2 flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-prime-light/30 dark:bg-bgMain-dark text-prime dark:text-prime-darkTheme flex items-center justify-center group-hover:scale-110 transition-transform">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-textMain-light dark:text-textMain-dark">
                Click to upload or drag image here
              </p>
              <p className="text-xs text-textMain-light/50 dark:text-textMain-dark/50 mt-1">
                PNG, JPG, WEBP Up to 5 MB
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end gap-3">
        <button
          onClick={reset}
          type="button"
          className="px-5 py-2.5 rounded-xl font-semibold text-textMain-light/70 dark:text-textMain-dark/70 bg-bgMain-light dark:bg-bgMain-dark hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 transition-all active:scale-95 cursor-pointer text-sm"
        >
          Reset (Reset)
        </button>

        <button
          type="submit"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl font-semibold text-surface-light dark:text-bgMain-dark bg-prime dark:bg-prime-darkTheme hover:bg-prime-dark dark:hover:bg-prime transition-all shadow-sm active:scale-95 cursor-pointer text-sm gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          Add Product
        </button>
      </div>
    </form>
  );
}
