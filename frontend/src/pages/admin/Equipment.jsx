import { useState } from "react";
import Table from "../../components/Table.jsx";
import Modal from "../../components/Modal.jsx";
import FormField from "../../components/FormField.jsx";
import { useToast } from "../../components/Toast.jsx";

const initialEquipment = [
  {
    id: "EQ-1001",
    name: "Projector",
    assignee: "Grade 8A",
    status: "Assigned",
    addedOn: "2026-02-01"
  },
  {
    id: "EQ-1002",
    name: "Tablet Set",
    assignee: "Science Lab",
    status: "Available",
    addedOn: "2026-02-03"
  },
  {
    id: "EQ-1003",
    name: "Smart Board",
    assignee: "Grade 9B",
    status: "Assigned",
    addedOn: "2026-02-05"
  }
];

export default function Equipment() {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [equipment, setEquipment] = useState(initialEquipment);
  const [form, setForm] = useState({ name: "", assignee: "", status: "Available" });
  const [editForm, setEditForm] = useState({ name: "", assignee: "", status: "Available" });

  const columns = [
    { key: "id", label: "Asset ID" },
    { key: "name", label: "Equipment" },
    { key: "assignee", label: "Assigned To" },
    { key: "status", label: "Status" },
    { key: "addedOn", label: "Added On" },
    { key: "actions", label: "Actions" }
  ];

  const handleAdd = () => {
    const today = new Date().toISOString().slice(0, 10);
    const next = {
      id: `EQ-${1000 + equipment.length + 1}`,
      name: form.name || "New Equipment",
      assignee: form.assignee || "Unassigned",
      status: form.status,
      addedOn: today
    };
    setEquipment((prev) => [next, ...prev]);
    setOpen(false);
    toast?.push({
      title: "Equipment saved",
      message: "Inventory updated successfully.",
      variant: "success"
    });
  };

  const handleEdit = (item) => {
    setActiveItem(item);
    setEditForm({ name: item.name, assignee: item.assignee, status: item.status });
    setEditOpen(true);
  };

  const handleUpdate = () => {
    setEquipment((prev) =>
      prev.map((item) =>
        item.id === activeItem.id
          ? { ...item, ...editForm }
          : item
      )
    );
    setEditOpen(false);
    toast?.push({
      title: "Equipment updated",
      message: "Equipment details updated successfully.",
      variant: "success"
    });
  };

  const handleDelete = (item) => {
    setEquipment((prev) => prev.filter((row) => row.id !== item.id));
    toast?.push({
      title: "Equipment removed",
      message: "Equipment entry deleted.",
      variant: "info"
    });
  };

  const tableData = equipment.map((item) => ({
    ...item,
    actions: (
      <div className="table-actions">
        <button className="btn ghost" onClick={() => handleEdit(item)}>Edit</button>
        <button className="btn ghost" onClick={() => handleDelete(item)}>Delete</button>
      </div>
    )
  }));

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Equipment Management</h2>
          <p>Track and allocate school equipment with status visibility.</p>
        </div>
        <div className="page-actions">
          <button className="btn primary" onClick={() => setOpen(true)}>Add Equipment</button>
        </div>
      </div>

      <Table columns={columns} data={tableData} />

      <Modal
        title="Add Equipment"
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <button className="btn primary" onClick={handleAdd}>Save</button>
        }
      >
        <FormField label="Equipment Name">
          <input
            type="text"
            placeholder="e.g. Projector"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
        </FormField>
        <FormField label="Assign To">
          <input
            type="text"
            placeholder="Class / Teacher"
            value={form.assignee}
            onChange={(event) => setForm((prev) => ({ ...prev, assignee: event.target.value }))}
          />
        </FormField>
        <FormField label="Status">
          <select
            value={form.status}
            onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
          >
            <option value="Available">Available</option>
            <option value="Assigned">Assigned</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </FormField>
      </Modal>

      <Modal
        title="Edit Equipment"
        open={editOpen}
        onClose={() => setEditOpen(false)}
        footer={
          <button className="btn primary" onClick={handleUpdate}>Update</button>
        }
      >
        <FormField label="Equipment Name">
          <input
            type="text"
            value={editForm.name}
            onChange={(event) => setEditForm((prev) => ({ ...prev, name: event.target.value }))}
          />
        </FormField>
        <FormField label="Assign To">
          <input
            type="text"
            value={editForm.assignee}
            onChange={(event) => setEditForm((prev) => ({ ...prev, assignee: event.target.value }))}
          />
        </FormField>
        <FormField label="Status">
          <select
            value={editForm.status}
            onChange={(event) => setEditForm((prev) => ({ ...prev, status: event.target.value }))}
          >
            <option value="Available">Available</option>
            <option value="Assigned">Assigned</option>
            <option value="Maintenance">Maintenance</option>
          </select>
        </FormField>
      </Modal>
    </div>
  );
}
