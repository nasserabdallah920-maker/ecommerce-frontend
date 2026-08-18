import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/NavBar";
import Sidebar from "../components/Sidebar/Sidebar";

export default function UserLayout() {

  return (
    <div className="flex flex-col min-h-screen bg-bgMain-light dark:bg-bgMain-dark">
      <Navbar />
      <div className="flex flex-1 relative">
        <div className="hidden md:block sticky top-20 h-[calc(100vh-5rem)] z-40">
          <Sidebar />
        </div>
        <main className="flex-1 w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
