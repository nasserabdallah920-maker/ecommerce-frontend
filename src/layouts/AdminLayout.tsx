import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import AdminNavbar from "../components/Admin Navbar/AdminNavbar";
import Sidebar from "../components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import Loading from "../components/shared/loading";

export default function AdminLayout() {
    const navigate = useNavigate();
  const userPayload = useSelector(
    (state: RootState) => state.authuser.initialState,
  );
  const isCompleted = useSelector(
    (state: RootState) => state.authuser.isCompleted,
  );
  useEffect(() => {
    if (isCompleted&&userPayload?.role !== "admin") {
      navigate("/", { replace: true });
    }
  }, [navigate, userPayload,isCompleted]);

if(!isCompleted)return <Loading/>
  return (
    <div className="flex flex-col min-h-screen bg-bgMain-light dark:bg-bgMain-dark">
      <AdminNavbar />
      <div className="flex flex-1 relative">
        <div className="hidden md:block sticky top-16 h-[calc(100vh-64px)] z-40 shrink-0">
          <Sidebar />
        </div>
        <main className="flex-1 min-w-0 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
