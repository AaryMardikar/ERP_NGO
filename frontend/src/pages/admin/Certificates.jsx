import { useState } from "react";
import Table from "../../components/Table.jsx";
import Modal from "../../components/Modal.jsx";
import FormField from "../../components/FormField.jsx";
import { useToast } from "../../components/Toast.jsx";

const initialRequests = [
  {
    id: "REQ-901",
    student: "Ava Patel",
    requester: "Parent - Priya Patel",
    type: "Bonafide",
    status: "Pending",
    requestedOn: "2026-02-05"
  },
  {
    id: "REQ-902",
    student: "Liam Jones",
    requester: "Parent - Sarah Jones",
    type: "Leaving",
    status: "Approved",
    requestedOn: "2026-02-06"
  }
];

export default function Certificates() {
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [requests, setRequests] = useState(initialRequests);
  const [activeRequest, setActiveRequest] = useState(null);
  const [form, setForm] = useState({ student: "", requester: "", type: "Bonafide" });
  const [uploadForm, setUploadForm] = useState({ recipient: "", file: null });

  const columns = [
    { key: "id", label: "Request ID" },
    { key: "student", label: "Student" },
    { key: "requester", label: "Requester" },
    { key: "type", label: "Type" },
    { key: "requestedOn", label: "Requested On" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" }
  ];

  const handleCreate = () => {
    const today = new Date().toISOString().slice(0, 10);
    const next = {
      id: `REQ-${900 + requests.length + 1}`,
      student: form.student || "New Student",
      requester: form.requester || "Parent Request",
      type: form.type,
      status: "Pending",
      requestedOn: today
    };
    setRequests((prev) => [next, ...prev]);
    setOpen(false);
    toast?.push({
      title: "Request added",
      message: "Certificate request logged successfully.",
      variant: "success"
    });
  };

  const updateStatus = (id, status) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status } : req))
    );
  };

  const handleSend = () => {
    if (!uploadForm.file || !uploadForm.recipient) {
      toast?.push({
        title: "Missing details",
        message: "Select a file and recipient before sending.",
        variant: "info"
      });
      return;
    }
    updateStatus(activeRequest.id, "Sent");
    setUploadOpen(false);
    toast?.push({
      title: "Certificate sent",
      message: `Sent to ${uploadForm.recipient}.`,
      variant: "success"
    });
  };

  const tableData = requests.map((req) => ({
    ...req,
    status: (
      <span
        className={`status-chip ${req.status.toLowerCase()}`}
      >
        {req.status}
      </span>
    ),
    actions: (
      <div className="table-actions">
        {req.status === "Pending" && (
          <>
            <button className="btn ghost" onClick={() => updateStatus(req.id, "Approved")}>
              Accept
            </button>
            <button className="btn ghost" onClick={() => updateStatus(req.id, "Declined")}>
              Decline
            </button>
          </>
        )}
        {req.status === "Approved" && (
          <button
            className="btn primary"
            onClick={() => {
              setActiveRequest(req);
              setUploadForm({ recipient: "", file: null });
              setUploadOpen(true);
            }}
          >
            Send Certificate
          </button>
        )}
      </div>
    )
  }));

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Certificate Requests</h2>
          <p>Review parent requests for bonafide or leaving certificates.</p>
        </div>
        <div className="page-actions">
          <button className="btn primary" onClick={() => setOpen(true)}>Add Request</button>
        </div>
      </div>

      <Table columns={columns} data={tableData} />

      <Modal
        title="Add Certificate Request"
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <button className="btn primary" onClick={handleCreate}>Save</button>
        }
      >
        <FormField label="Student Name">
          <input
            type="text"
            placeholder="Student name"
            value={form.student}
            onChange={(event) => setForm((prev) => ({ ...prev, student: event.target.value }))}
          />
        </FormField>
        <FormField label="Requester">
          <input
            type="text"
            placeholder="Parent / Guardian"
            value={form.requester}
            onChange={(event) => setForm((prev) => ({ ...prev, requester: event.target.value }))}
          />
        </FormField>
        <FormField label="Certificate Type">
          <select
            value={form.type}
            onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
          >
            <option value="Bonafide">Bonafide</option>
            <option value="Leaving">Leaving</option>
          </select>
        </FormField>
        <div className="helper-text">Requests are created by parents in the portal.</div>
      </Modal>

      <Modal
        title="Send Certificate"
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        footer={
          <button className="btn primary" onClick={handleSend}>Send</button>
        }
      >
        <div className="helper-text">
          Sending for {activeRequest?.student} ({activeRequest?.type})
        </div>
        <FormField label="Recipient Email">
          <input
            type="email"
            placeholder="parent@email.com"
            value={uploadForm.recipient}
            onChange={(event) => setUploadForm((prev) => ({ ...prev, recipient: event.target.value }))}
          />
        </FormField>
        <FormField label="Select Certificate File">
          <input
            type="file"
            onChange={(event) =>
              setUploadForm((prev) => ({ ...prev, file: event.target.files?.[0] || null }))
            }
          />
        </FormField>
      </Modal>
    </div>
  );
}
