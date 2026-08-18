import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Ticket,
  Plus,
  Trash2,
  Eye,
  Search,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Edit,
} from "lucide-react";
import EmptyState from "../../../../components/shared/EmptyState";
import { useCouponsManagement } from "../hooks/useCouponsManagement";
import Loading from "../../../../components/shared/loading";

export default function CouponsPage() {
  const { coupons, deleteCoupon, getAllCoupons, loading } =
    useCouponsManagement();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    getAllCoupons();
  }, [getAllCoupons]);

  const safeCoupons = Array.isArray(coupons) ? coupons : [];
  const filteredCoupons = safeCoupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchQuery.toLowerCase().trim()),
  );

  const totalCoupons = safeCoupons.length;
  const activeCoupons = safeCoupons.filter((c) => c.isActive).length;
  const disabledCoupons = totalCoupons - activeCoupons;

  const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCoupons = filteredCoupons.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  if (loading) return <Loading />;

  const stats = [
    {
      title: "Total Coupons",
      value: totalCoupons,
      color: "text-textMain-light dark:text-textMain-dark",
      bgColor: "bg-prime/10 text-prime dark:text-prime-darkTheme",
      icon: Ticket,
    },
    {
      title: "Active Coupons",
      value: activeCoupons,
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      icon: CheckCircle2,
    },
    {
      title: "Disabled Coupons",
      value: disabledCoupons,
      color: "text-rose-600 dark:text-rose-400",
      bgColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
      icon: XCircle,
    },
  ];

  const tableHeaders = [
    "Code",
    "Type",
    "Value",
    "Minimum Order",
    "Expiration Date",
    "Status",
  ];

  return (
    <div className="min-h-screen bg-bgMain-light dark:bg-bgMain-dark p-4 sm:p-8 md:p-12 transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
              <Ticket className="w-7 h-7 text-prime dark:text-prime-darkTheme" />
              Coupon Management
            </h1>
            <p className="text-xs sm:text-sm text-textMain-light/50 dark:text-textMain-dark/50 mt-1">
              Create, view, and manage discount codes
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={() => {
                getAllCoupons();
                setCurrentPage(1);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-textMain-light/70 dark:text-textMain-dark/70 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all text-sm cursor-pointer"
            >
              Update
            </button>

            <Link
              to="/admin/coupons/create"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white bg-prime hover:bg-prime/90 transition-all text-sm shadow-md shadow-prime/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Coupon</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map(({ title, value, color, bgColor, icon: Icon }) => (
            <div
              key={title}
              className="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 font-medium">
                  {title}
                </p>
                <h3 className={`text-2xl font-bold mt-1 ${color}`}>{value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${bgColor}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>

        <div className="relative max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search coupon by code..."
            className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-textMain-light/40 dark:text-textMain-dark/40">
            <Search className="w-4 h-4" />
          </div>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
          {filteredCoupons.length === 0 ? (
            <EmptyState
              icon={<Ticket className="w-12 h-12" />}
              title="No Coupons Found"
              description="There are currently no coupons to display."
            />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800 text-textMain-light/50 dark:text-textMain-dark/50 text-xs font-semibold">
                      {tableHeaders.map((header) => (
                        <th key={header} className="pb-3 px-4">
                          {header}
                        </th>
                      ))}
                      <th className="pb-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                    {currentCoupons.map((coupon) => (
                      <tr
                        key={coupon._id}
                        className="hover:bg-bgMain-light/50 dark:hover:bg-bgMain-dark/50 transition-colors"
                      >
                        <td className="py-4 px-4 font-mono font-bold text-prime dark:text-prime-darkTheme">
                          {coupon.code}
                        </td>
                        <td className="py-4 px-4 text-textMain-light/80 dark:text-textMain-dark/80">
                          {coupon.type === "percentage"
                            ? "Percentage"
                            : "Fixed Amount"}
                        </td>
                        <td className="py-4 px-4 font-semibold text-textMain-light dark:text-textMain-dark">
                          {coupon.type === "percentage"
                            ? `%${coupon.value}`
                            : `${coupon.value} EGP.م`}
                        </td>
                        <td className="py-4 px-4 text-textMain-light/70 dark:text-textMain-dark/70">
                          {coupon.minOrder} EGP.م
                        </td>
                        <td className="py-4 px-4 text-textMain-light/70 dark:text-textMain-dark/70">
                          {new Date(coupon.expiresAt).toLocaleDateString(
                            "ar-EG",
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${coupon.isActive ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-rose-500/10 text-rose-600 dark:text-rose-400"}`}
                          >
                            {coupon.isActive ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" /> Active
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3.5 h-3.5" /> Disabled
                              </>
                            )}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <Link
                              to={`/admin/coupons/edit/${coupon._id}`}
                              title="Edit"
                              className="p-2 rounded-lg text-textMain-light/60 dark:text-textMain-dark/60 hover:text-prime dark:hover:text-prime-darkTheme hover:bg-bgMain-light dark:hover:bg-bgMain-dark transition-colors cursor-pointer"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <Link
                              to={`/admin/coupons/${coupon._id}`}
                              title="View Details"
                              className="p-2 rounded-lg text-textMain-light/60 dark:text-textMain-dark/60 hover:text-prime dark:hover:text-prime-darkTheme hover:bg-bgMain-light dark:hover:bg-bgMain-dark transition-colors cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => deleteCoupon(coupon._id)}
                              title="Delete"
                              className="p-2 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredCoupons.length > itemsPerPage && (
                <div className="flex items-center justify-between pt-6 mt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-textMain-light/70 dark:text-textMain-dark/70">
                  <div>
                    View{" "}
                    <span className="font-semibold text-prime dark:text-prime-darkTheme">
                      {startIndex + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-semibold text-prime dark:text-prime-darkTheme">
                      {Math.min(
                        startIndex + itemsPerPage,
                        filteredCoupons.length,
                      )}
                    </span>{" "}
                    out of{" "}
                    <span className="font-semibold text-prime dark:text-prime-darkTheme">
                      {filteredCoupons.length}
                    </span>{" "}
                    coupon
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-bgMain-light dark:hover:bg-bgMain-dark transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <span className="px-3 py-1 font-semibold">
                      {currentPage} / {totalPages}
                    </span>

                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-bgMain-light dark:hover:bg-bgMain-dark transition-colors cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
