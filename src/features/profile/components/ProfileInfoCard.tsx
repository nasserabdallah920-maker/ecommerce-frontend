import { Camera, ShieldCheck } from "lucide-react";
import type { ProfileInfoCardProps } from "../interfaces";




export default function ProfileInfoCard({ form }: ProfileInfoCardProps) {

  return (
    <div className="p-6 rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row items-center gap-6">
      <div className="relative group">
        <div className="w-24 h-24 rounded-full bg-prime-light/40 dark:bg-bgMain-dark border-2 border-prime dark:border-prime-darkTheme flex items-center justify-center text-prime dark:text-prime-darkTheme font-bold text-3xl">
          {form?.firstName?.[0]?.toUpperCase() || ""}
          {form?.lastName?.[0]?.toUpperCase() || ""}
        </div>
        <button className="absolute bottom-0 right-0 p-2 rounded-full bg-prime dark:bg-prime-darkTheme text-surface-light dark:text-bgMain-dark shadow-md hover:scale-110 transition-transform">
          <Camera className="w-4 h-4" />
        </button>
      </div>

      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-bold text-textMain-light dark:text-textMain-dark">
          {form?.firstName} {form?.lastName}
        </h2>
        <p className="text-sm text-textMain-light/60 dark:text-textMain-dark/60 mt-0.5">
          {form?.email}
        </p>
        <span className="inline-flex items-center px-3 py-1 mt-3 text-xs font-semibold rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified Account
        </span>
      </div>
    </div>
  );
}
