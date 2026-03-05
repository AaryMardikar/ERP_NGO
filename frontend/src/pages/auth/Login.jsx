import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import FormField from "../../components/FormField.jsx";

export default function Login() {
    const navigate = useNavigate();
    const login = useAuthStore((s) => s.login);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("admin");
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        try {
            await login({ username, password, role });
            navigate(`/${role}`);
        } catch (err) {
            setError(err.message || "Login failed");
        }
    };

    const isStudent = role === 'student';

    return (
        <div className="auth-shell">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-title">School ERP System</div>
                    <div className="auth-subtitle">Sign in to manage your institution</div>
                </div>
                <form onSubmit={handleSubmit} className="auth-form">
                    {error && <div className="auth-error" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                    <FormField label={isStudent ? "Student Name" : "Username"}>
                        <input
                            type="text"
                            placeholder={isStudent ? "Enter your full name" : "Enter username"}
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            required
                        />
                    </FormField>
                    <FormField label={isStudent ? "Student ID" : "Password"}>
                        <input
                            type={isStudent ? "text" : "password"}
                            placeholder={isStudent ? "Enter your 4-digit ID" : "Enter password"}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </FormField>
                    <FormField label="Role">
                        <div className="segmented">
                            {["admin", "teacher", "student", "parent"].map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    className={"segmented-btn" + (role === option ? " active" : "")}
                                    onClick={() => {
                                        setRole(option);
                                        setError(null);
                                        setUsername("");
                                        setPassword("");
                                    }}
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
                    Use role switcher to preview Admin, Teacher, Student, or Parent portals.
                </div>
            </div>
        </div>
    );
}
