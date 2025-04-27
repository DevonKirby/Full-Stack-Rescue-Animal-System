import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = React.useContext(AuthContext);

    return isAuthenticated ? <Outlet /> : <Navigate to="/admin-login" replace />;
}