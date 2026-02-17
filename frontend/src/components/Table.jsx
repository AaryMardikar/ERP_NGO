import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Table({ columns, data, pageSize = 8 }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil((data?.length || 0) / pageSize));

  const rows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return (data || []).slice(start, start + pageSize);
  }, [data, page, pageSize]);

  const goTo = (next) => {
    const value = Math.min(totalPages, Math.max(1, next));
    setPage(value);
  };

  return (
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
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="empty-cell">
                No records found.
              </td>
            </tr>
          )}
          {rows.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="table-footer">
        <div>
          Page {page} of {totalPages}
        </div>
        <div className="table-pagination">
          <button className="btn ghost" onClick={() => goTo(page - 1)}>
            <ChevronLeft size={16} />
            Prev
          </button>
          <button className="btn ghost" onClick={() => goTo(page + 1)}>
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
