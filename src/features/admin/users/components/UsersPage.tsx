import { Search, Trash2, Eye, Users, ChevronRight, ChevronLeft, UserCheck, UserX, UserMinus } from "lucide-react";
import { useUsersManagement } from "../hooks/useUsersManagement";
import EmptyState from "../../../../components/shared/EmptyState";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/shared/loading";

export default function UsersPage() {
  const {
    users,
    searchQuery,
    setSearchQuery,
    searchUsers,
    deleteUser,
    getAllUsers,blockUser,loading
  } = useUsersManagement();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const nav = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchUsers();
  };

  const safeUsers = Array.isArray(users) ? users : [];

  const totalUsers = safeUsers.length;
  const blockedUsers = safeUsers.filter((u) => u.isBlocked === true).length;
  const activeUsers = totalUsers - blockedUsers;

  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = safeUsers.slice(startIndex, startIndex + itemsPerPage);

  if(loading) return<Loading/>
  return (
    <div className="min-h-screen bg-bgMain-light dark:bg-bgMain-dark p-4 sm:p-8 md:p-12 transition-colors">
      <div className="max-w-6xl mx-auto space-y-6">
     
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-textMain-light dark:text-textMain-dark flex items-center gap-2">
              <Users className="w-7 h-7 text-prime dark:text-prime-darkTheme" />
              User Management
            </h1>
            <p className="text-xs sm:text-sm text-textMain-light/50 dark:text-textMain-dark/50 mt-1">
              View, search, and delete registered users
            </p>
          </div>

          <button
            onClick={() => {
              getAllUsers();
              setCurrentPage(1);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-textMain-light/70 dark:text-textMain-dark/70 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all text-sm cursor-pointer self-start sm:self-auto"
          >
            Update
          </button>
        </div>

      
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
       
          <div className="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 font-medium">Total Users</p>
              <h3 className="text-2xl font-bold text-textMain-light dark:text-textMain-dark mt-1">{totalUsers}</h3>
            </div>
            <div className="p-3 rounded-xl bg-prime/10 text-prime dark:text-prime-darkTheme">
              <Users className="w-6 h-6" />
            </div>
          </div>

         
          <div className="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 font-medium">Active Users</p>
              <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{activeUsers}</h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>

       
          <div className="p-5 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs text-textMain-light/60 dark:text-textMain-dark/60 font-medium">Blocked Users</p>
              <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">{blockedUsers}</h3>
            </div>
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <UserX className="w-6 h-6" />
            </div>
          </div>
        </div>

  
        <form onSubmit={handleSearchSubmit} className="relative max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 text-textMain-light dark:text-textMain-dark text-sm focus:outline-none focus:border-prime dark:focus:border-prime-darkTheme transition-colors"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-textMain-light/40 dark:text-textMain-dark/40 hover:text-prime dark:hover:text-prime-darkTheme"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

   
        <div className="p-6 sm:p-8 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
          {users.length === 0 ? (
            <EmptyState
              icon={<UserMinus className="w-12 h-12" />}
              title="No Users Found"
              description="There are currently no users to display."
            />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800 text-textMain-light/50 dark:text-textMain-dark/50 text-xs font-semibold">
                      <th className="pb-3 px-4">User</th>
                      <th className="pb-3 px-4">Email Address</th>
                      <th className="pb-3 px-4">Role</th>
                      <th className="pb-3 px-4">Status</th>
                      <th className="pb-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                    {currentUsers.map((u) => (
                      <tr
                        key={u._id}
                        className="hover:bg-bgMain-light/50 dark:hover:bg-bgMain-dark/50 transition-colors"
                      >
                        <td className="py-4 px-4 font-semibold text-textMain-light dark:text-textMain-dark">
                          {u.firstName + " " + u.lastName}
                        </td>
                        <td className="py-4 px-4 text-textMain-light/70 dark:text-textMain-dark/70">
                          {u.email}
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-prime-light/30 dark:bg-bgMain-dark text-prime dark:text-prime-darkTheme">
                            {u.role || "User"}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                          onClick={()=>{blockUser(u._id)}}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                              u.isBlocked
                                ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            }`}
                          >
                            {u.isBlocked === true ? "Blocked" : "Active"}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => nav(`/admin/users/${u._id}`)}
                              title="View Details"
                              className="p-2 rounded-lg text-textMain-light/60 dark:text-textMain-dark/60 hover:text-prime dark:hover:text-prime-darkTheme hover:bg-bgMain-light dark:hover:bg-bgMain-dark transition-colors cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteUser(u._id)}
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

     
              {safeUsers.length > itemsPerPage && (
                <div className="flex items-center justify-between pt-6 mt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-textMain-light/70 dark:text-textMain-dark/70">
                  <div>
                    View <span className="font-semibold text-prime dark:text-prime-darkTheme">{startIndex + 1}</span> to{" "}
                    <span className="font-semibold text-prime dark:text-prime-darkTheme">
                      {Math.min(startIndex + itemsPerPage, safeUsers.length)}
                    </span>{" "}
                    out of <span className="font-semibold text-prime dark:text-prime-darkTheme">{safeUsers.length}</span> User
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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