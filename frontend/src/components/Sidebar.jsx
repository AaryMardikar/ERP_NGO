import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardCheck,
  UserCheck,
  BookOpen,
  Briefcase,
  Award,
  Repeat,
  Bell
} from "lucide-react";

const NAV = {
  admin: [
    { label: "Overview", to: "/admin", icon: LayoutDashboard },
    { label: "Student Attendance", to: "/admin/student-attendance", icon: ClipboardCheck },
    { label: "Teacher Attendance", to: "/admin/teacher-attendance", icon: UserCheck },
    { label: "Teacher Substitution", to: "/admin/substitution", icon: Repeat },
    { label: "Certificates", to: "/admin/certificates", icon: Award },
    { label: "Equipment", to: "/admin/equipment", icon: Briefcase },
    { label: "Library", to: "/admin/library", icon: BookOpen }
  ],
  teacher: [
    { label: "Overview", to: "/teacher", icon: LayoutDashboard },
    { label: "Attendance", to: "/teacher/attendance", icon: ClipboardCheck },
    { label: "Substitution Alerts", to: "/teacher/substitution", icon: Bell }
  ],
  parent: [
    { label: "Overview", to: "/parent", icon: LayoutDashboard },
    { label: "Attendance", to: "/parent/attendance", icon: ClipboardCheck }
  ]
};

export default function Sidebar({ role }) {
  const items = NAV[role] || [];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-accent" />
        <div>
          <div className="brand-title">School ERP</div>
          <div className="brand-subtitle">Operations Suite</div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                "sidebar-link" + (isActive ? " active" : "")
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
