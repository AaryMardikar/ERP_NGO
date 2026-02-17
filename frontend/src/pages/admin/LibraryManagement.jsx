import { useMemo, useState } from "react";
import Modal from "../../components/Modal.jsx";
import FormField from "../../components/FormField.jsx";
import { useToast } from "../../components/Toast.jsx";

const initialBooks = [
  {
    isbn: "978-0132350884",
    title: "Clean Code",
    category: "Programming",
    status: "Available",
    issuedOn: "",
    dueOn: ""
  },
  {
    isbn: "978-0062315007",
    title: "Sapiens",
    category: "History",
    status: "Issued",
    issuedOn: "2026-01-20 10:00",
    dueOn: "2026-02-03 10:00"
  },
  {
    isbn: "978-0545162074",
    title: "Percy Jackson",
    category: "Literature",
    status: "Available",
    issuedOn: "",
    dueOn: ""
  }
];

export default function LibraryManagement() {
  const toast = useToast();
  const [books, setBooks] = useState(initialBooks);
  const [open, setOpen] = useState(false);
  const [returnIsbn, setReturnIsbn] = useState("");
  const [issuedHistory, setIssuedHistory] = useState([
    {
      isbn: "978-0062315007",
      title: "Sapiens",
      issuedOn: "2026-01-20 10:00"
    }
  ]);
  const [returnHistory, setReturnHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [form, setForm] = useState({
    title: "",
    isbn: "",
    category: "General",
    issuedOn: "",
    dueOn: ""
  });

  const columns = [
    { key: "isbn", label: "ISBN" },
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "issuedOn", label: "Issued On" },
    { key: "dueOn", label: "Due On" },
    { key: "status", label: "Status" }
  ];

  const addDays = (date, days) => {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  };

  const formatDateTime = (date) => {
    const pad = (value) => String(value).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
      date.getHours()
    )}:${pad(date.getMinutes())}`;
  };

  const handleAdd = () => {
    const issuedDate = form.issuedOn ? new Date(form.issuedOn) : null;
    const dueDate = issuedDate ? addDays(issuedDate, 14) : null;
    const next = {
      isbn: form.isbn || `978-0000-${books.length + 1000}`,
      title: form.title || "New Book",
      category: form.category,
      status: issuedDate ? "Issued" : "Available",
      issuedOn: issuedDate ? formatDateTime(issuedDate) : "",
      dueOn: dueDate ? formatDateTime(dueDate) : ""
    };
    setBooks((prev) => [next, ...prev]);
    if (issuedDate) {
      setIssuedHistory((prev) => [
        { isbn: next.isbn, title: next.title, issuedOn: next.issuedOn },
        ...prev
      ]);
    }
    setOpen(false);
    toast?.push({
      title: "Book added",
      message: "Library inventory updated successfully.",
      variant: "success"
    });
  };

  const markReturn = () => {
    if (!returnIsbn) {
      toast?.push({
        title: "Select a book",
        message: "Choose an issued book to return.",
        variant: "info"
      });
      return;
    }
    const returnedOn = formatDateTime(new Date());
    setBooks((prev) =>
      prev.map((book) =>
        book.isbn === returnIsbn
          ? { ...book, status: "Available", issuedOn: "", dueOn: "" }
          : book
      )
    );
    const returnedBook = books.find((book) => book.isbn === returnIsbn);
    if (returnedBook) {
      setReturnHistory((prev) => [
        { isbn: returnedBook.isbn, title: returnedBook.title, returnedOn },
        ...prev
      ]);
    }
    setReturnIsbn("");
    toast?.push({
      title: "Book returned",
      message: "Return recorded with updated availability.",
      variant: "success"
    });
  };

  const isOverdue = (book) => {
    if (book.status !== "Issued" || !book.issuedOn) return false;
    const issuedDate = new Date(book.issuedOn.replace(" ", "T"));
    const now = new Date();
    const diffDays = Math.floor((now - issuedDate) / (1000 * 60 * 60 * 24));
    return diffDays > 14;
  };

  const tableData = useMemo(
    () =>
      books.map((book) => ({
        ...book,
        status: isOverdue(book) ? "Overdue" : book.status
      })),
    [books]
  );

  const issuedForDate = issuedHistory.filter((item) =>
    item.issuedOn.startsWith(selectedDate)
  );
  const returnedForDate = returnHistory.filter((item) =>
    item.returnedOn.startsWith(selectedDate)
  );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2>Library Management</h2>
          <p>Manage books, issue tracking, and overdue status.</p>
        </div>
        <div className="page-actions">
          <button className="btn primary" onClick={() => setOpen(true)}>Add Book</button>
        </div>
      </div>

      <div className="grid-2">
        <div className="panel">
          <h3>Return Book</h3>
          <FormField label="Select Issued Book">
            <select
              value={returnIsbn}
              onChange={(event) => setReturnIsbn(event.target.value)}
            >
              <option value="">Choose a book</option>
              {books
                .filter((book) => book.status === "Issued")
                .map((book) => (
                  <option key={book.isbn} value={book.isbn}>
                    {book.title} ({book.isbn})
                  </option>
                ))}
            </select>
          </FormField>
          <button className="btn primary" onClick={markReturn}>Return Book</button>
        </div>
        <div className="panel">
          <h3>Daily History</h3>
          <FormField label="Select Date">
            <input
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
            />
          </FormField>
          <div className="list">
            <div>Issued: {issuedForDate.length}</div>
            <div>Returned: {returnedForDate.length}</div>
          </div>
          <div className="list">
            <div>Issued Books: {issuedForDate.map((item) => item.title).join(", ") || "-"}</div>
            <div>Returned Books: {returnedForDate.map((item) => item.title).join(", ") || "-"}</div>
          </div>
        </div>
      </div>

      <div className="table-shell">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((book) => (
              <tr key={book.isbn} className={isOverdue(book) ? "overdue" : ""}>
                <td>{book.isbn}</td>
                <td>{book.title}</td>
                <td>{book.category}</td>
                <td>{book.issuedOn || "-"}</td>
                <td>{book.dueOn || "-"}</td>
                <td>{book.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        title="Add New Book"
        open={open}
        onClose={() => setOpen(false)}
        footer={<button className="btn primary" onClick={handleAdd}>Save</button>}
      >
        <FormField label="Title">
          <input
            type="text"
            placeholder="Book title"
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          />
        </FormField>
        <FormField label="ISBN">
          <input
            type="text"
            placeholder="ISBN"
            value={form.isbn}
            onChange={(event) => setForm((prev) => ({ ...prev, isbn: event.target.value }))}
          />
        </FormField>
        <FormField label="Category">
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
          />
        </FormField>
        <FormField label="Issue Date & Time">
          <input
            type="datetime-local"
            value={form.issuedOn}
            onChange={(event) => setForm((prev) => ({ ...prev, issuedOn: event.target.value }))}
          />
        </FormField>
      </Modal>
    </div>
  );
}
