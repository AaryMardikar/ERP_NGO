import { LogOut, UserCircle } from "lucide-react";
import { useAuthStore } from "../store/authStore";

export default function Topbar() {
  const { user, role, logout } = useAuthStore();

  return (
    <header className="topbar">
      <div>
        <div className="topbar-title">Welcome back</div>
        <div className="topbar-subtitle">Manage your school operations efficiently</div>
      </div>
      <div className="topbar-actions">
        <div className="profile-chip">
          <UserCircle size={18} />
          <div className="profile-meta">
            <div className="profile-name">{user?.name || "User"}</div>
            <div className="profile-role">{role?.toUpperCase()}</div>
          </div>
        </div>
        <button className="btn ghost" onClick={logout}>
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}
