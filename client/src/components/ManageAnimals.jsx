import React, { useEffect, useState } from 'react';
import api from '../api.js';

export default function ManageAnimals({ animalType }) {
    const [animals, setAnimals] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const res = await api.get(`/${animalType}`);
                setAnimals(res.data);
            } catch (err) {
                setError(`Error fetching ${animalType}: ${err.message}`);
                console.error(`Error fetching ${animalType}:`, err);
            }
        };

        fetchAnimals();
    }, [animalType]);

    return (
        <div className="container mt-5 text-light">
            <h2 className="mb-4 text-center">Manage {animalType.charAt(0).toUpperCase() + animalType.slice(1)}</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row g-4">
                {animals.map((animal) => (
                    <div key={animal.id} className="col-md-4">
                        <div className="card h-100 bg-dark text-light border-light">
                            <div className="card-body">
                                <h5 className="card-title">{animal.name}</h5>
                                <p className="card-text">Quantity: {animal.quantity}</p>
                                {/* Add Edit/Delete buttons later if you want */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}