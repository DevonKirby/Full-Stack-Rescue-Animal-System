import React, { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    const checkAuth = () => {
        const token = localStorage.getItem('adminToken');
        setIsAuthenticated(!!token);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        checkAuth();
    }, [location]);

    useEffect(() => {
        const interval = setInterval((checkAuth), 15000);
        return () => clearInterval(interval);
    }, []);

    const login = (token) => {
        localStorage.setItem('adminToken', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
