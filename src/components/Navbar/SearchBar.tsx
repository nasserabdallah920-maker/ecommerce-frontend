import { useEffect, useState } from "react";
import type { IProduct } from "../../features/products/products.interfaces";
import axios from "axios";
import { Axios } from "../../lib/axios";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [product, setPrduct] = useState<IProduct[] | []>([]);

  useEffect(() => {
    if (!search.trim()) return;
    const timer = setTimeout(async () => {
      try {
        const res = await Axios.get(`/products/get?search=${search}`);
        setPrduct(res.data.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setPrduct([]);
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const nav = useNavigate();
  return (
    <>
      <div className=" md:flex flex-1 max-w-md mx-4 relative">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for products..."
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl leading-5 bg-gray-50 dark:bg-gray-800/50 text-textMain-light dark:text-textMain-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-prime dark:focus:ring-prime-darkTheme focus:border-prime dark:focus:border-prime-darkTheme transition-colors duration-200 sm:text-sm"
          />
        </div>

        {search && (
          <div className="absolute left-0 right-0 top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 max-h-80 overflow-y-auto z-50 transition-all duration-200">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              {product?.map((pro) => (
                <li
                  onClick={() => {
                    nav(`/product/${pro._id}`);
                    setPrduct([]);
                    setSearch("");
                  }}
                  className="px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700/60 cursor-pointer flex items-center justify-between transition-colors"
                >
                  <span className="font-medium truncate">{pro.title}</span>
                </li>
              ))}

              {search && product.length == 0 && (
                <li className="px-4 py-3 text-center text-gray-400 dark:text-gray-500">
                  No matching results
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
