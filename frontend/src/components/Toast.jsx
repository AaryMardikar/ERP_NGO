import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext(null);

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const push = useCallback(({ title, message, variant = "info" }) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, title, message, variant }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    }, []);

    return (
        <ToastContext.Provider value={{ push }}>
            {children}
            <div className="toast-container">
                {toasts.map((t) => (
                    <div key={t.id} className={`toast toast-${t.variant}`}>
                        <strong>{t.title}</strong>
                        <p>{t.message}</p>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
