import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is stored in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const register = async (email, password, role, name) => {
        // Mock registration - in production, this would call your backend
        const newUser = {
            id: Date.now(),
            email,
            name,
            role, // 'admin' or 'verifier'
        };

        // Store in localStorage (mock database)
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push({ ...newUser, password });
        localStorage.setItem('users', JSON.stringify(users));

        // Set current user
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));

        return newUser;
    };

    const login = async (email, password) => {
        // Mock login - in production, this would call your backend
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);

        if (!foundUser) {
            throw new Error('Invalid credentials');
        }

        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));

        return userWithoutPassword;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isVerifier: user?.role === 'verifier',
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
