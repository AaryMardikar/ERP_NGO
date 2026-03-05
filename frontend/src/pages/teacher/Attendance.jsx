import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useToast } from "../../components/Toast.jsx";
import axios from "axios";

export default function Attendance() {
    const toast = useToast();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/students");
                setStudents(response.data);
            } catch (error) {
                toast?.push({
                    title: "Error",
                    message: "Failed to fetch students",
                    variant: "error"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, [toast]);

    const columns = [
        { key: "id", label: "Student ID" },
        { key: "name", label: "Student" },
        { key: "class", label: "Class" },
        { key: "status", label: "Status" }
    ];

    const setStatus = (id, status) => {
        setAttendance((prev) => ({ ...prev, [id]: status }));
    };

    const setAll = (status) => {
        const next = {};
        students.forEach((student) => {
            next[student._id] = status;
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

    if (loading) return <div>Loading...</div>;

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
                        {students.map((student) => (
                            <tr key={student._id}>
                                <td style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 'bold' }}>
                                    {student.aadhaar ? student.aadhaar.slice(-4) : student._id.slice(-4)}
                                </td>
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
                                                    ((attendance[student._id] || "present") === status ? " active " : " ") +
                                                    status
                                                }
                                                onClick={() => setStatus(student._id, status)}
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
