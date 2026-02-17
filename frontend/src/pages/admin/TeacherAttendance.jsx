import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useToast } from "../../components/Toast.jsx";

const staff = [
  { id: "TCH-203", name: "Sophia Rivera", dept: "Mathematics" },
  { id: "TCH-216", name: "Ethan Brooks", dept: "Science" },
  { id: "TCH-229", name: "Isabella Reed", dept: "English" },
  { id: "TCH-241", name: "Lucas Grant", dept: "History" }
];

export default function TeacherAttendance() {
  const toast = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});

  const columns = [
    { key: "id", label: "Teacher ID" },
    { key: "name", label: "Teacher" },
    { key: "dept", label: "Department" },
    { key: "status", label: "Status" }
  ];

  const setStatus = (id, status) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  const handleSave = () => {
    toast?.push({
      title: "Attendance saved",
      message: "Teacher attendance recorded. Review absences for substitutions.",
      variant: "success"
    });
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Teacher Attendance</h2>
          <p>Track teacher availability to drive substitution workflows.</p>
        </div>
        <div className="page-actions">
          <DatePicker selected={selectedDate} onChange={setSelectedDate} />
          <button className="btn primary" onClick={handleSave}>Save Attendance</button>
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
            {staff.map((teacher) => (
              <tr key={teacher.id}>
                <td>{teacher.id}</td>
                <td>{teacher.name}</td>
                <td>{teacher.dept}</td>
                <td>
                  <div className="attendance-toggle">
                    {["present", "absent", "late"].map((status) => (
                      <button
                        key={status}
                        type="button"
                        className={
                          "attendance-chip" +
                          ((attendance[teacher.id] || "present") === status ? " active " : " ") +
                          status
                        }
                        onClick={() => setStatus(teacher.id, status)}
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
