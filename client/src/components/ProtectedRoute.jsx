import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem('adminToken');

    return token ? <Outlet /> : <Navigate to="/admin-login" />;
}