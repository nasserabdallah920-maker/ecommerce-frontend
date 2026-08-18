import { useParams } from "react-router-dom";
import ProductControls from "./ProductControls";
import { useProductDetails } from "../../hooks/useProductDetails";
import type { IProduct } from "../../products.interfaces";
import Loading from "../../../../components/shared/loading";

export default function ProductDetails({ product }: { product: IProduct }) {
  const { id } = useParams<{ id: string }>();
  const { selectedImageIndex, setSelectedImageIndex,loading } = useProductDetails(id);
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const getFullImageUrl = (imgPath?: string) => {
    return baseUrl + imgPath;
  };

  const images = Array.isArray(product.images)
    ? product.images
    : typeof product.images === "string"
      ? [product.images]
      : [];
  const mainImageUrl = getFullImageUrl(images[selectedImageIndex]);

  if(loading)return <Loading/>
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
      <div className="flex flex-col gap-4">
        <div className="w-full h-95 sm:h-120 bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden relative shadow-sm flex items-center justify-center">
          <img
            src={mainImageUrl}
            alt={product.title}
            className="w-full h-full object-cover"
          />

          {product.stock <= 0 ? (
            <span className="absolute top-4 right-4 bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-lg backdrop-blur-sm">
              Out of Stock
            </span>
          ) : (
            <span className="absolute top-4 right-4 bg-emerald-500/90 text-white text-xs font-bold px-3 py-1 rounded-lg backdrop-blur-sm">
              In Stock ({product.stock})
            </span>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {images.map((img: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                  selectedImageIndex === index
                    ? "border-prime dark:border-prime-darkTheme scale-95"
                    : "border-gray-200 dark:border-gray-800 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={getFullImageUrl(img)}
                  alt={`${product.title} thumb ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-textMain-light dark:text-textMain-dark leading-tight">
            {product.title}
          </h1>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-prime dark:text-prime-darkTheme">
              ${product.price}
            </span>
          </div>

          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-textMain-light/40 dark:text-textMain-dark/40 mb-2">
              Description
            </h3>
            <p className="text-sm sm:text-base text-textMain-light/70 dark:text-textMain-dark/70 leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        <ProductControls />
      </div>
    </div>
  );
}
