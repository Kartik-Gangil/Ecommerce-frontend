
import { useState, useEffect } from 'react';

export function useAuth() {
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Initial token check
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
        setIsLoading(false);

        // Listen for storage changes
        const handleStorageChange = (e) => {
            if (e.key === 'token') {
                setToken(e.newValue);
            }
        };

        // Listen for custom events (for same-tab updates)
        const handleAuthChange = (e:any) => {
            setToken(e.detail.token);
        };

        window.addEventListener('storage', handleStorageChange);
        window.addEventListener('authChange', handleAuthChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            window.removeEventListener('authChange', handleAuthChange);
        };
    }, []);

    const login = (newToken:string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        // Dispatch custom event for same-tab updates
        window.dispatchEvent(new CustomEvent('authChange', { detail: { token: newToken } }));
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        // Dispatch custom event for same-tab updates
        window.dispatchEvent(new CustomEvent('authChange', { detail: { token: null } }));
    };

    return { token, isLoading, login, logout };
}