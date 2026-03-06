import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import { useAuthStore } from "./store/authStore";
import { ToastProvider } from "./components/Toast.jsx";
import BonafideCertificate from "./pages/student/BonafideCertificate";

const Login = lazy(() => import("./pages/auth/Login.jsx"));

const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard.jsx"));
const Certificates = lazy(() => import("./pages/admin/Certificates.jsx"));
const Equipment = lazy(() => import("./pages/admin/Equipment.jsx"));
const StudentAttendance = lazy(() => import("./pages/admin/StudentAttendance.jsx"));
const AdminTeacherAttendance = lazy(() => import("./pages/admin/TeacherAttendance.jsx"));
const LibraryManagement = lazy(() => import("./pages/admin/LibraryManagement.jsx"));
const TeacherSubstitution = lazy(() => import("./pages/admin/TeacherSubstitution.jsx"));

const TeacherDashboard = lazy(() => import("./pages/teacher/TeacherDashboard.jsx"));
const TeacherAttendance = lazy(() => import("./pages/teacher/Attendance.jsx"));
const SubstitutionNotifications = lazy(() => import("./pages/teacher/SubstitutionNotifications.jsx"));

const ParentDashboard = lazy(() => import("./pages/parent/ParentDashboard.jsx"));
const ParentAttendance = lazy(() => import("./pages/parent/Attendance.jsx"));

const StudentDashboard = lazy(() => import("./pages/student/StudentDashboard.jsx"));
const StudentAttendanceView = lazy(() => import("./pages/student/Attendance.jsx"));
const StudentMarksView = lazy(() => import("./pages/student/Marks.jsx"));

const RequireAuth = ({ children }) => {
    const { token } = useAuthStore();
    if (!token) return <Navigate to="/login" replace />;
    return children;
};

const RequireRole = ({ role, children }) => {
    const { role: currentRole } = useAuthStore();
    if (currentRole !== role) return <Navigate to="/login" replace />;
    return children;
};

const RoleRedirect = () => {
    const { token, role } = useAuthStore();
    if (!token) return <Navigate to="/login" replace />;
    if (role === "admin") return <Navigate to="/admin" replace />;
    if (role === "teacher") return <Navigate to="/teacher" replace />;
    if (role === "parent") return <Navigate to="/parent" replace />;
    if (role === "student") return <Navigate to="/student" replace />;
    return <Navigate to="/login" replace />;
};

export default function App() {
    const init = useAuthStore((s) => s.init);

    useEffect(() => {
        init();
    }, [init]);

    return (
        <ToastProvider>
            <Suspense fallback={<div className="page-loading">Loading...</div>}>
                <Routes>
                    <Route path="/" element={<RoleRedirect />} />
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/admin"
                        element={
                            <RequireAuth>
                                <RequireRole role="admin">
                                    <DashboardLayout />
                                </RequireRole>
                            </RequireAuth>
                        }
                    >
                        <Route index element={<AdminDashboard />} />
                        <Route path="certificates" element={<Certificates />} />
                        <Route path="equipment" element={<Equipment />} />
                        <Route path="student-attendance" element={<StudentAttendance />} />
                        <Route path="teacher-attendance" element={<AdminTeacherAttendance />} />
                        <Route path="library" element={<LibraryManagement />} />
                        <Route path="substitution" element={<TeacherSubstitution />} />
                    </Route>

                    <Route
                        path="/teacher"
                        element={
                            <RequireAuth>
                                <RequireRole role="teacher">
                                    <DashboardLayout />
                                </RequireRole>
                            </RequireAuth>
                        }
                    >
                        <Route index element={<TeacherDashboard />} />
                        <Route path="attendance" element={<TeacherAttendance />} />
                        <Route path="substitution" element={<SubstitutionNotifications />} />
                    </Route>

                    <Route
                        path="/parent"
                        element={
                            <RequireAuth>
                                <RequireRole role="parent">
                                    <DashboardLayout />
                                </RequireRole>
                            </RequireAuth>
                        }
                    >
                        <Route index element={<ParentDashboard />} />
                        <Route path="attendance" element={<ParentAttendance />} />
                    </Route>

                    <Route
                        path="/student"
                        element={
                            <RequireAuth>
                                <RequireRole role="student">
                                    <DashboardLayout />
                                </RequireRole>
                            </RequireAuth>
                        }
                    >
                        <Route index element={<StudentDashboard />} />
                        <Route path="attendance" element={<StudentAttendanceView />} />
                        <Route path="marks" element={<StudentMarksView />} />
                        <Route path="/student/bonafide" element={<BonafideCertificate />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </ToastProvider>
    );
}
