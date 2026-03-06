import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    ClipboardCheck,
    UserCheck,
    BookOpen,
    Briefcase,
    Award,
    Repeat,
    Bell,
    PlusCircle
} from "lucide-react";

const NAV = {
    admin: [
        { label: "Overview", to: "/admin", icon: LayoutDashboard },
        { label: "Student Attendance", to: "/admin/student-attendance", icon: ClipboardCheck },
        { label: "Teacher Attendance", to: "/admin/teacher-attendance", icon: UserCheck },
        { label: "Teacher Substitution", to: "/admin/substitution", icon: Repeat },
        { label: "Certificates", to: "/admin/certificates", icon: Award },
        { label: "Equipment", to: "/admin/equipment", icon: Briefcase },
        { label: "Library", to: "/admin/library", icon: BookOpen }
    ],
    teacher: [
        { label: "Overview", to: "/teacher", icon: LayoutDashboard },
        { label: "Attendance", to: "/teacher/attendance", icon: ClipboardCheck },
        { label: "Substitution Alerts", to: "/teacher/substitution", icon: Bell }
    ],
    parent: [
        { label: "Overview", to: "/parent", icon: LayoutDashboard },
        { label: "Attendance", to: "/parent/attendance", icon: ClipboardCheck }
    ],
    student: [
        { label: "Overview", to: "/student", icon: LayoutDashboard },
        { label: "Attendance", to: "/student/attendance", icon: ClipboardCheck },
        { label: "Marks", to: "/student/marks", icon: Award },
        { label: "Bonafide Certificate", to: "/student/bonafide", icon: Award }
    ]
};

export default function Sidebar({ role }) {
    const items = NAV[role] || [];
    const [teachers, setTeachers] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newTeacher, setNewTeacher] = useState({ name: '', username: '', password: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (role === 'admin') {
            fetchTeachers();
        }
    }, [role]);

    const fetchTeachers = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/teachers");
            if (res.ok) {
                const data = await res.json();
                setTeachers(data);
            }
        } catch (err) {
            console.error("Failed to fetch teachers", err);
        }
    };

    const handleAddTeacher = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/teachers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTeacher)
            });
            if (res.ok) {
                setNewTeacher({ name: '', username: '', password: '' });
                setShowAddForm(false);
                fetchTeachers();
            } else {
                alert("Failed to add teacher");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <aside className="sidebar" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
            <div className="sidebar-brand">
                <span className="brand-accent" />
                <div>
                    <div className="brand-title">School ERP</div>
                    <div className="brand-subtitle">Operations Suite</div>
                </div>
            </div>
            <nav className="sidebar-nav" style={{ flexGrow: 1 }}>
                {items.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end
                            className={({ isActive }) =>
                                "sidebar-link" + (isActive ? " active" : "")
                            }
                        >
                            <Icon size={18} />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}

                {role === 'admin' && (
                    <div style={{ marginTop: '20px', padding: '0 15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <h4 style={{ color: '#8b9bb4', fontSize: '12px', textTransform: 'uppercase', marginBottom: 0 }}>Teachers</h4>
                            <button
                                onClick={() => setShowAddForm(!showAddForm)}
                                style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
                                title="Add Teacher"
                            >
                                <PlusCircle size={16} />
                            </button>
                        </div>

                        {showAddForm && (
                            <form onSubmit={handleAddTeacher} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '6px' }}>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={newTeacher.name}
                                    onChange={e => setNewTeacher({ ...newTeacher, name: e.target.value })}
                                    required
                                    style={{ padding: '6px', fontSize: '12px', borderRadius: '4px', border: '1px solid #334155', background: '#1e293b', color: 'white' }}
                                />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={newTeacher.username}
                                    onChange={e => setNewTeacher({ ...newTeacher, username: e.target.value })}
                                    required
                                    style={{ padding: '6px', fontSize: '12px', borderRadius: '4px', border: '1px solid #334155', background: '#1e293b', color: 'white' }}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={newTeacher.password}
                                    onChange={e => setNewTeacher({ ...newTeacher, password: e.target.value })}
                                    required
                                    style={{ padding: '6px', fontSize: '12px', borderRadius: '4px', border: '1px solid #334155', background: '#1e293b', color: 'white' }}
                                />
                                <button type="submit" disabled={loading} style={{ padding: '6px', fontSize: '12px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                    {loading ? 'Adding...' : 'Add'}
                                </button>
                            </form>
                        )}

                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            {teachers.map(teacher => (
                                <li key={teacher._id} style={{ background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 'bold' }}>{teacher.name}</div>
                                    <div style={{ color: '#94a3b8', fontSize: '11px' }}>U: {teacher.username}</div>
                                    <div style={{ color: '#94a3b8', fontSize: '11px' }}>P: {teacher.rawPassword}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>
        </aside>
    );
}
