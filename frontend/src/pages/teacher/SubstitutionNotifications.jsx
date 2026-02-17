import { useState } from "react";
import { Bell } from "lucide-react";

const initialNotifications = [
  {
    id: "SUB-001",
    className: "Grade 8B",
    time: "10:30 AM",
    date: "Today",
    originalTeacher: "Ethan Brooks"
  }
];

export default function SubstitutionNotifications() {
  const [notifications] = useState(initialNotifications);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Substitution Notifications</h2>
          <p>Stay informed about substitution assignments and schedules.</p>
        </div>
      </div>

      <div className="panel">
        {notifications.map((notice) => (
          <div key={notice.id} className="notice-card">
            <div className="notice-icon">
              <Bell size={18} />
            </div>
            <div>
              <div className="notice-title">You have been assigned to conduct {notice.className}</div>
              <div className="notice-meta">
                Time: {notice.time} | Date: {notice.date} | Original Teacher: {notice.originalTeacher}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
