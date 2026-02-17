import { useMemo, useState } from "react";
import Modal from "../../components/Modal.jsx";
import FormField from "../../components/FormField.jsx";
import Table from "../../components/Table.jsx";
import { useToast } from "../../components/Toast.jsx";

const absentTeachers = [
  { id: "TCH-216", name: "Ethan Brooks", class: "Grade 8B", period: "3" },
  { id: "TCH-241", name: "Lucas Grant", class: "Grade 9A", period: "5" }
];

const presentTeachers = [
  { id: "TCH-203", name: "Sophia Rivera" },
  { id: "TCH-229", name: "Isabella Reed" },
  { id: "TCH-254", name: "Oliver Park" }
];

export default function TeacherSubstitution() {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(absentTeachers[0]);
  const [form, setForm] = useState({ substitute: presentTeachers[0].id, time: "10:30 AM" });
  const [records, setRecords] = useState([]);

  const columns = [
    { key: "original", label: "Original Teacher" },
    { key: "substitute", label: "Substitute" },
    { key: "class", label: "Class" },
    { key: "time", label: "Time" }
  ];

  const handleAssign = () => {
    const sub = presentTeachers.find((t) => t.id === form.substitute);
    const next = {
      original: selected?.name,
      substitute: sub?.name,
      class: selected?.class,
      time: `${form.time} (Period ${selected?.period})`
    };
    setRecords((prev) => [next, ...prev]);
    setOpen(false);
    toast?.push({
      title: "Substitution assigned",
      message: "Substitute teacher notified successfully.",
      variant: "success"
    });
  };

  const pending = useMemo(() => absentTeachers, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Teacher Substitution</h2>
          <p>Assign present teachers to cover absent staff and notify them instantly.</p>
        </div>
        <div className="page-actions">
          <button className="btn primary" onClick={() => setOpen(true)}>Assign Substitute</button>
        </div>
      </div>

      <div className="grid-2">
        <div className="panel">
          <h3>Absent Teachers</h3>
          <ul className="list">
            {pending.map((teacher) => (
              <li key={teacher.id}>
                {teacher.name} - {teacher.class} (Period {teacher.period})
              </li>
            ))}
          </ul>
        </div>
        <div className="panel">
          <h3>Substitution Records</h3>
          <Table columns={columns} data={records} pageSize={4} />
        </div>
      </div>

      <Modal
        title="Assign Substitute"
        open={open}
        onClose={() => setOpen(false)}
        footer={<button className="btn primary" onClick={handleAssign}>Assign</button>}
      >
        <FormField label="Absent Teacher">
          <select
            value={selected?.id}
            onChange={(event) =>
              setSelected(absentTeachers.find((t) => t.id === event.target.value))
            }
          >
            {absentTeachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name} ({teacher.class})
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Substitute Teacher">
          <select
            value={form.substitute}
            onChange={(event) => setForm((prev) => ({ ...prev, substitute: event.target.value }))}
          >
            {presentTeachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Time">
          <input
            type="text"
            value={form.time}
            onChange={(event) => setForm((prev) => ({ ...prev, time: event.target.value }))}
          />
        </FormField>
      </Modal>
    </div>
  );
}
