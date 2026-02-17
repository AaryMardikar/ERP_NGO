import { ClipboardCheck, Users, UserCheck, TrendingUp } from "lucide-react";

const cards = [
  {
    title: "Total Students",
    value: "1,248",
    delta: "+3.4%",
    icon: Users
  },
  {
    title: "Total Teachers",
    value: "86",
    delta: "+1.1%",
    icon: UserCheck
  },
  {
    title: "Attendance Today",
    value: "94%",
    delta: "+0.8%",
    icon: ClipboardCheck
  },
  {
    title: "Monthly Growth",
    value: "7.2%",
    delta: "On track",
    icon: TrendingUp
  }
];

const attendanceTrend = [
  { label: "Mon", value: 92 },
  { label: "Tue", value: 94 },
  { label: "Wed", value: 90 },
  { label: "Thu", value: 96 },
  { label: "Fri", value: 95 }
];

export default function AdminDashboard() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Admin Dashboard</h2>
          <p>Track institution-wide performance and operations at a glance.</p>
        </div>
      </div>

      <div className="card-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="stat-card">
              <div className="stat-icon">
                <Icon size={18} />
              </div>
              <div>
                <div className="stat-title">{card.title}</div>
                <div className="stat-value">{card.value}</div>
                <div className="stat-delta">{card.delta}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid-2">
        <div className="panel chart-panel">
          <h3>Live Attendance Trend</h3>
          <div className="chart-bars">
            {attendanceTrend.map((item) => (
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
            <span>Updates every 5 min (API-ready)</span>
          </div>
        </div>
        <div className="panel">
          <h3>Operational Snapshot</h3>
          <ul className="list">
            <li>Library books issued today: 42</li>
            <li>Equipment due for return: 6</li>
            <li>Pending certificate approvals: 9</li>
          </ul>
          <div className="panel-actions">
            <button className="btn primary">Mark Attendance</button>
            <button className="btn ghost">Assign Substitute</button>
            <button className="btn ghost">Issue Certificate</button>
          </div>
        </div>
      </div>
    </div>
  );
}
