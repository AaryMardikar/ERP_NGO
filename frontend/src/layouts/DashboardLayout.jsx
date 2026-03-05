import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import { useAuthStore } from "../store/authStore";

export default function DashboardLayout() {
    const role = useAuthStore((s) => s.role);
    const logout = useAuthStore((s) => s.logout);

    return (
        <div className="dashboard-layout">
            <Sidebar role={role} />
            <main className="main-content">
                <header className="topbar">
                    <div className="topbar-right">
                        <button className="btn ghost" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </header>
                <div className="content-area">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
