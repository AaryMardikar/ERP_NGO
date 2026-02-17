import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import { useAuthStore } from "../store/authStore";

export default function DashboardLayout() {
  const role = useAuthStore((s) => s.role);

  return (
    <div className="dashboard-shell">
      <Sidebar role={role} />
      <div className="dashboard-main">
        <Topbar />
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
