import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useToast } from "../../components/Toast.jsx";

const roster = [
  { id: "STU-1092", name: "Ava Patel" },
  { id: "STU-1047", name: "Liam Jones" },
  { id: "STU-1189", name: "Mia Chen" },
  { id: "STU-1133", name: "Noah Garcia" }
];

export default function Attendance() {
  const toast = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});

  const columns = [
    { key: "id", label: "Student ID" },
    { key: "name", label: "Student" },
    { key: "status", label: "Status" }
  ];

  const setStatus = (id, status) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  const setAll = (status) => {
    const next = {};
    roster.forEach((student) => {
      next[student.id] = status;
    });
    setAttendance(next);
  };

  const handleSave = () => {
    toast?.push({
      title: "Attendance marked",
      message: "Daily attendance saved successfully.",
      variant: "success"
    });
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Class Attendance</h2>
          <p>Mark attendance for your class with quick summaries.</p>
        </div>
        <div className="page-actions">
          <DatePicker selected={selectedDate} onChange={setSelectedDate} />
          <button className="btn primary" onClick={handleSave}>Save Attendance</button>
        </div>
      </div>

      <div className="panel">
        <div className="panel-actions">
          <button className="btn ghost" onClick={() => setAll("present")}>Mark All Present</button>
          <button className="btn ghost" onClick={() => setAll("absent")}>Mark All Absent</button>
          <button className="btn ghost" onClick={() => setAll("late")}>Mark All Late</button>
        </div>
      </div>

      <div className="panel">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roster.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>
                  <div className="attendance-toggle">
                    {["present", "absent", "late"].map((status) => (
                      <button
                        key={status}
                        type="button"
                        className={
                          "attendance-chip" +
                          ((attendance[student.id] || "present") === status ? " active " : " ") +
                          status
                        }
                        onClick={() => setStatus(student.id, status)}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
