import { create } from "zustand";

const STORAGE_KEY = "school_erp_auth";

const loadAuth = () => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};

const saveAuth = (state) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
        // no-op
    }
};

export const useAuthStore = create((set, get) => ({
    user: null,
    token: null,
    role: null,
    init: () => {
        const data = loadAuth();
        if (data?.token && data?.role) {
            set({ user: data.user, token: data.token, role: data.role });
        }
    },
    login: async ({ username, password, role }) => {
        if (role === "admin" || role === "student") {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password, role })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Invalid credentials");
            }

            const next = {
                user: role === "admin" ? data.admin : data.student,
                token: data.token,
                role
            };
            set(next);
            saveAuth(next);
        } else {
            // Mock login for teacher/parent for now
            const next = {
                user: { name: username || "User" },
                token: "mock-token-" + Date.now(),
                role
            };
            set(next);
            saveAuth(next);
        }
    },
    logout: () => {
        set({ user: null, token: null, role: null });
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch {
            // no-op
        }
    },
    isAuthenticated: () => Boolean(get().token)
}));
