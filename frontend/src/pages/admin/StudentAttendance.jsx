import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useToast } from "../../components/Toast.jsx";

const initialStudents = [
  { id: "STU-1092", name: "Ava Patel", class: "Grade 6" },
  { id: "STU-1047", name: "Liam Jones", class: "Grade 8" },
  { id: "STU-1189", name: "Mia Chen", class: "Grade 7" },
  { id: "STU-1133", name: "Noah Garcia", class: "Grade 9" }
];

export default function StudentAttendance() {
  const toast = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});

  const columns = [
    { key: "id", label: "Student ID" },
    { key: "name", label: "Student" },
    { key: "class", label: "Class" },
    { key: "status", label: "Status" }
  ];

  const setStatus = (id, status) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  const markAttendance = () => {
    toast?.push({
      title: "Attendance updated",
      message: "Student attendance saved successfully.",
      variant: "success"
    });
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Student Attendance</h2>
          <p>Record daily student attendance and review historical data.</p>
        </div>
        <div className="page-actions">
          <DatePicker selected={selectedDate} onChange={setSelectedDate} />
          <button className="btn primary" onClick={markAttendance}>Save Attendance</button>
          <button className="btn ghost">Export CSV</button>
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
            {initialStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.class}</td>
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
