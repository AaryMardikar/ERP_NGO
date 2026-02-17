import { Bell, CalendarCheck, Users } from "lucide-react";

const highlights = [
  { title: "Classes Today", value: "5", icon: Users },
  { title: "Attendance Pending", value: "2", icon: CalendarCheck },
  { title: "Substitution Alerts", value: "1", icon: Bell }
];

const classAttendance = [
  { label: "Grade 8A", value: 93 },
  { label: "Grade 7B", value: 95 },
  { label: "Grade 9C", value: 91 },
  { label: "Grade 6A", value: 97 }
];

export default function TeacherDashboard() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Teacher Dashboard</h2>
          <p>Plan lessons, mark attendance, and track substitution notices.</p>
        </div>
      </div>

      <div className="card-grid">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="stat-card">
              <div className="stat-icon">
                <Icon size={18} />
              </div>
              <div>
                <div className="stat-title">{item.title}</div>
                <div className="stat-value">{item.value}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid-2">
        <div className="panel chart-panel">
          <h3>Live Class Attendance</h3>
          <div className="chart-bars">
            {classAttendance.map((item) => (
              <div key={item.label} className="chart-bar">
                <div className="chart-bar-label">
                  {item.label} · {item.value}%
                </div>
                <div className="chart-bar-track">
                  <div className="chart-bar-fill" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <span>Live data placeholder</span>
            <span>Connects to attendance API</span>
          </div>
        </div>
        <div className="panel">
          <h3>Today&apos;s Schedule</h3>
          <ul className="list">
            <li>Grade 8A - Mathematics - 09:00 AM</li>
            <li>Grade 7B - Mathematics - 11:30 AM</li>
            <li>Grade 9C - Mathematics - 02:00 PM</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
