import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import FormField from "../../components/FormField.jsx";

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("admin");

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ username, role });
    navigate(`/${role}`);
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-title">School ERP System</div>
          <div className="auth-subtitle">Sign in to manage your institution</div>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <FormField label="Username">
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormField>
          <FormField label="Role">
            <div className="segmented">
              {["admin", "teacher", "parent"].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={"segmented-btn" + (role === option ? " active" : "")}
                  onClick={() => setRole(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </FormField>
          <button type="submit" className="btn primary full">
            Login
          </button>
        </form>
        <div className="auth-footer">
          Use role switcher to preview Admin, Teacher, or Parent portals.
        </div>
      </div>
    </div>
  );
}
