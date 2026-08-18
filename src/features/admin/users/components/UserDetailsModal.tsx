import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
  User as UserIcon, 
  Mail, 
  Shield, 
  Calendar, 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle,
  Hash
} from "lucide-react";
import { useUsersManagement } from "../hooks/useUsersManagement";
import Loading from "../../../../components/shared/loading";

export default function UserDetailsContent() {
  const { id } = useParams();
  const { getUserDetails, selectedUser, blockUser,loading } = useUsersManagement();

  useEffect(() => {
    if (id) {
      getUserDetails(id);
    }
  }, [id, getUserDetails]);

  if ( !selectedUser||loading) {
    return <Loading/>
  }

  const fullName = [selectedUser.firstName, selectedUser.lastName].filter(Boolean).join(" ") || "Not specified";

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      
      <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
        selectedUser.isBlocked 
          ? "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400" 
          : "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
      }`}>
        <div className="flex items-center gap-3">
          {selectedUser.isBlocked ? (
            <XCircle className="w-5 h-5 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          )}
          <div>
            <p className="text-sm font-bold">
              {selectedUser.isBlocked ? "Blocked Account" : "Active Account"}
            </p>
            <p className="text-xs opacity-80">
              {selectedUser.isBlocked 
                ? "This user is currently blocked" 
                : "Account is active with full permissions"}
            </p>
          </div>
        </div>


        <button
          onClick={() => blockUser(selectedUser._id)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ${
            selectedUser.isBlocked
              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
              : "bg-rose-600 hover:bg-rose-700 text-white"
          }`}
        >
          {selectedUser.isBlocked ? (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Unblock</span>
            </>
          ) : (
            <>
              <ShieldAlert className="w-4 h-4" />
              <span>Block User</span>
            </>
          )}
        </button>
      </div>


      <div className="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm space-y-5">
        <h3 className="text-base font-bold text-textMain-light dark:text-textMain-dark border-b border-gray-100 dark:border-gray-800 pb-3">
          Account Data
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
 
          <div className="flex items-start gap-3 p-3 rounded-xl bg-bgMain-light/50 dark:bg-bgMain-dark/50 border border-gray-100 dark:border-gray-800">
            <div className="p-2 rounded-lg bg-prime/10 text-prime dark:text-prime-darkTheme">
              <UserIcon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-textMain-light/50 dark:text-textMain-dark/50 block">Full Name</span>
              <span className="text-sm font-semibold text-textMain-light dark:text-textMain-dark">
                {fullName}
              </span>
            </div>
          </div>


          <div className="flex items-start gap-3 p-3 rounded-xl bg-bgMain-light/50 dark:bg-bgMain-dark/50 border border-gray-100 dark:border-gray-800">
            <div className="p-2 rounded-lg bg-prime/10 text-prime dark:text-prime-darkTheme">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[11px] text-textMain-light/50 dark:text-textMain-dark/50 block">Email Address</span>
              <span className="text-sm font-semibold text-textMain-light dark:text-textMain-dark block truncate" dir="ltr">
                {selectedUser.email}
              </span>
            </div>
          </div>

  
          <div className="flex items-start gap-3 p-3 rounded-xl bg-bgMain-light/50 dark:bg-bgMain-dark/50 border border-gray-100 dark:border-gray-800">
            <div className="p-2 rounded-lg bg-prime/10 text-prime dark:text-prime-darkTheme">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] text-textMain-light/50 dark:text-textMain-dark/50 block">Role</span>
              <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-md text-xs font-bold uppercase bg-prime/10 text-prime dark:text-prime-darkTheme">
                {selectedUser.role || "user"}
              </span>
            </div>
          </div>

  
          {selectedUser.createdAt && (
            <div className="flex items-start gap-3 p-3 rounded-xl bg-bgMain-light/50 dark:bg-bgMain-dark/50 border border-gray-100 dark:border-gray-800">
              <div className="p-2 rounded-lg bg-prime/10 text-prime dark:text-prime-darkTheme">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-textMain-light/50 dark:text-textMain-dark/50 block">Creation Date</span>
                <span className="text-sm font-semibold text-textMain-light dark:text-textMain-dark">
                  {new Date(selectedUser.createdAt).toLocaleDateString("ar-EG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          )}

        </div>

        <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-1.5 text-xs text-textMain-light/40 dark:text-textMain-dark/40 font-mono">
          <Hash className="w-3.5 h-3.5" />
          <span>ID:</span>
          <span className="select-all">{selectedUser._id}</span>
        </div>
      </div>

    </div>
  );
}