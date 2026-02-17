import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from "../../components/Table.jsx";

const history = [
  { date: "2026-02-03", status: "Present" },
  { date: "2026-02-04", status: "Present" },
  { date: "2026-02-05", status: "Absent" },
  { date: "2026-02-06", status: "Present" }
];

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const columns = [
    { key: "date", label: "Date" },
    { key: "status", label: "Status" }
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Attendance History</h2>
          <p>Review attendance records and monthly summaries.</p>
        </div>
        <div className="page-actions">
          <DatePicker selected={selectedDate} onChange={setSelectedDate} />
        </div>
      </div>

      <Table columns={columns} data={history} />
    </div>
  );
}
