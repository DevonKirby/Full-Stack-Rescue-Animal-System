import React from "react";
import { Link } from "react-router-dom";

export default function Admin() {
    return (
        <div className="container mt-5 text-light">
            <h2 className="text-center mb-4">Admin Dashboard</h2>

            <div className="text-end mb-4">
                <Link to="/" className="btn btn-outline-light">← Back to Home</Link>
            </div>

            <div className="row g-4">
                <div className="col-md-6">
                    <Link to="/admin/dogs" className="btn btn-outline-primary w-100 p-3">
                        Manage Dogs
                    </Link>
                </div>
                <div className="col-md-6">
                    <Link to="/admin/monkeys" className="btn btn-outline-success w-100 p-3">
                        Manage Monkeys
                    </Link>
                </div>
                <div className="col-md-12">
                    <Link to="/admin/add-animal" className="btn btn-outline-warning w-100 p-3">
                        ➕ Add New Animal
                    </Link>
                </div>
            </div>
        </div>
    );
}