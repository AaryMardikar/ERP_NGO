import { CalendarCheck, User } from "lucide-react";

export default function ParentDashboard() {
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Parent Dashboard</h2>
          <p>Monitor your child&apos;s progress and attendance.</p>
        </div>
      </div>

      <div className="card-grid">
        <div className="stat-card">
          <div className="stat-icon"><User size={18} /></div>
          <div>
            <div className="stat-title">Child</div>
            <div className="stat-value">Ava Patel</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><CalendarCheck size={18} /></div>
          <div>
            <div className="stat-title">Attendance</div>
            <div className="stat-value">96%</div>
          </div>
        </div>
      </div>

      <div className="panel">
        <h3>Summary</h3>
        <ul className="list">
          <li>Classes attended this month: 21</li>
          <li>Absences recorded: 1</li>
          <li>Upcoming parent meeting: March 12</li>
        </ul>
      </div>
    </div>
  );
}
