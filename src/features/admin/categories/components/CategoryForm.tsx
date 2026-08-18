import { useEffect } from "react";
import {
  ArrowLeft,
  Image as ImageIcon,
  Folder,
  FileText,
  UploadCloud,
  Save,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategoriesManagement } from "../hooks/useCategoriesManagement";
import Loading from "../../../../components/shared/loading";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default function CategoryFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    changeCategoryInformation,
    category,
    getCategory,
    setCategory,
    setImage,
    changeCategoryImage,
    createCategory,
    loading,
  } = useCategoriesManagement();
  useEffect(() => {
    if (id) {
      getCategory(id);
    }
  }, [id, getCategory]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCategory((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading) return <Loading />;
  return (
    <div className="min-h-screen bg-bgMain-light dark:bg-bgMain-dark p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-textMain-light dark:text-textMain-dark hover:border-prime dark:hover:border-prime-darkTheme transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-textMain-light dark:text-textMain-dark">
              Category Data
            </h1>
            <p className="text-xs sm:text-sm text-textMain-light/70 dark:text-textMain-dark/70">
              View and update category details.
            </p>
          </div>
        </div>

        <form className="p-6 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 space-y-6">
          <div className="p-3 rounded-lg bg-bgMain-light/50 dark:bg-bgMain-dark/50 border border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs sm:text-sm">
            <span className="text-textMain-light/60 dark:text-textMain-dark/60 font-medium">
              Category ID:
            </span>
            <span className="font-mono text-prime dark:text-prime-darkTheme font-semibold">
              {category?._id}
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
              <Folder className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
              Category Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={category?.name}
              onChange={(e) => handleChange(e)}
              placeholder="Enter category name"
              className="w-full px-4 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-100 dark:border-gray-800 text-sm text-textMain-light dark:text-textMain-dark focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
              <FileText className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              defaultValue={category?.description}
              onChange={(e) => handleChange(e)}
              placeholder="Enter category description"
              className="w-full px-4 py-2.5 rounded-xl bg-bgMain-light dark:bg-bgMain-dark border border-gray-100 dark:border-gray-800 text-sm text-textMain-light dark:text-textMain-dark focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-all resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
              Category Image
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 bg-bgMain-light/40 dark:bg-bgMain-dark/40">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-bgMain-light dark:bg-bgMain-dark border border-gray-100 dark:border-gray-800 flex items-center justify-center shrink-0">
                {
                  <img
                    src={baseUrl + category?.image}
                    alt={category?.name}
                    className="w-full h-full object-cover"
                  />
                }
              </div>

              <div className="flex-1 space-y-3 text-center sm:text-right">
                <p
                  className="text-xs font-mono text-textMain-light/60 dark:text-textMain-dark/60 truncate"
                  dir="ltr"
                >
                  {category?.image || "No image selected"}
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <label className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 text-textMain-light dark:text-textMain-dark hover:border-prime dark:hover:border-prime-darkTheme transition-all cursor-pointer active:scale-95">
                    <UploadCloud className="w-4 h-4 text-prime dark:text-prime-darkTheme" />
                    <span>Change Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      if (id) {
                        changeCategoryImage(id);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center gap-2 transition-all active:scale-95 cursor-pointer shadow-sm shadow-emerald-600/20"
                  >
                    <Save className="w-4 h-4" />
                    <span>Confirm Save</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (id) {
                  changeCategoryInformation(id);
                } else {
                  createCategory();
                }
              }}
              className="px-6 py-2.5 rounded-xl bg-prime text-white font-semibold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
