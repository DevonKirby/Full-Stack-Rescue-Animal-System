import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await api.post('/admin/login', {
                username,
                password,
            });

            localStorage.setItem('adminToken', res.data.token);
            navigate('/admin');
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };

    const handleBackToHome = () => {
        navigate('/');
    }

    return (
        <div className="container mt-5 text-light position-relative">
            <button
                onClick={handleBackToHome}
                className="btn btn-outline-light position-absolute"
                style={{ top: 0, right: 0 }}
            >
                ← Back to Home
            </button>

            <h2 className="mb-4 text-center">Admin Login</h2>

            <input
                className="form-control mb-3"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="form-control mb-3"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary w-100" onClick={handleLogin}>
                Login
            </button>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    )
}