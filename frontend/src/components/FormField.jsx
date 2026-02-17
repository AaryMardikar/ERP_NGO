export default function FormField({ label, error, hint, children }) {
  return (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <div className="form-control">{children}</div>
      {hint && <div className="form-hint">{hint}</div>}
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}
