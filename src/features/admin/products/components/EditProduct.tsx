import {
  ArrowRight,
  Edit3,
  Tag,
  DollarSign,
  Package,
  FileText,
  ImageIcon,
  UploadCloud,
  Trash2,
  Save,
  RotateCcw,
  Plus,
} from "lucide-react";
import { useEditProduct } from "../hooks/useEditProduct";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../../../../components/shared/loading";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function EditProductPage() {
  const { id } = useParams();
  const {
    getProduct,
    price,
    stock,
    title,
    description,
    removeImage,
    product,
    setDescription,
    setPrice,
    setStock,
    setTitle,
    updateProduct,
    setNewImages,
    newImages,addImage,loading
  } = useEditProduct();



  useEffect(() => {
    if (id) getProduct(id);
  }, [getProduct, id]);



  if (!id||loading) return <Loading />;

  return (
    <div className="min-h-screen bg-bgMain-light dark:bg-bgMain-dark p-4 sm:p-8 md:p-12 transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-2 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 text-textMain-light/70 dark:text-textMain-dark/70 hover:text-textMain-light dark:hover:text-textMain-dark transition-colors cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
                <Edit3 className="w-6 h-6 text-prime dark:text-prime-darkTheme" />
                Edit Product
              </h1>
              <p className="text-xs sm:text-sm text-textMain-light/50 dark:text-textMain-dark/50 mt-1">
                #Prod-ID : {product?._id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-textMain-light/70 dark:text-textMain-dark/70 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all text-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Cancel
            </button>

            <button
              onClick={() => updateProduct(id)}
              type="submit"
              form="edit-product-form"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-surface-light dark:text-bgMain-dark bg-prime dark:bg-prime-darkTheme hover:bg-prime-dark dark:hover:bg-prime transition-all shadow-md active:scale-95 cursor-pointer text-sm"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>


        <form
          id="edit-product-form"
          onSubmit={(e) => {
            e.preventDefault();

          }}
          className="p-6 sm:p-8 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-xl space-y-6"
        >

          <div className="space-y-2">
            <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
              <Tag className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
              Product Name (Title)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors"
            />
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
                Price (Price)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors"
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
                type="text"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors"
              />
            </div>
          </div>


          <div className="space-y-2">
            <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
              <FileText className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
              Product Description (Description)
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors resize-none"
            />
          </div>


          <div className="space-y-3">
            <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
              Current Product Images
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {product?.images.map((img, index) => (
                <div
                  key={index}
                  className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 aspect-square bg-bgMain-light dark:bg-bgMain-dark"
                >
                  <img
                    src={baseUrl + img}
                    alt={`product-img-${index}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button
                      onClick={() => {
                        removeImage(id, img.split("/")[2]);
                      }}
                      type="button"
                      title="Delete Image"
                      className="p-2 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition-colors cursor-pointer active:scale-90"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
              Add New Images
            </label>
            <button
            onClick={()=>addImage(id)}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-textMain-light/70 dark:text-textMain-dark/70 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all text-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              add
            </button>
            <div className="relative border-2 border-dashed border-gray-200 dark:border-gray-800 hover:border-prime dark:hover:border-prime-darkTheme rounded-2xl p-6 text-center bg-bgMain-light/50 dark:bg-bgMain-dark/50 transition-colors cursor-pointer group">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files) {
                    setNewImages(Array.from(e.target.files));
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-2 flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-prime-light/30 dark:bg-bgMain-dark text-prime dark:text-prime-darkTheme flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-textMain-light dark:text-textMain-dark">
                    {newImages.length > 0
                      ? `Selected ${newImages.length} New Images`
                      : "Click to upload more images or drag them here"}
                  </p>
                  <p className="text-xs text-textMain-light/50 dark:text-textMain-dark/50 mt-1">
                    PNG, JPG, WEBP Up to 5 MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
