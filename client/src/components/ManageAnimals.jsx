import React, { useEffect, useState } from 'react';
import api from '../api.js';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditAnimalModal from './EditAnimalModal.jsx';

export default function ManageAnimals({ animalType }) {
    const [animals, setAnimals] = useState([]);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedAnimal, setSelectedAnimal] = useState(null);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const res = await api.get(`/${animalType}`);
                setAnimals(res.data);
            } catch (err) {
                setError(`Error fetching ${animalType}: ${err.message}`);
                console.error(`Error fetching ${animalType}:`, err);
            }
        };

        fetchAnimals();
    }, [animalType]);

    const handleDelete = async (animalName) => {
        if (!window.confirm(`Are you sure you want to delete ${animalName}?`)) {
            return;
        }

        try {
            await api.delete(`/${animalType}/${animalName}`);
            toast.success(`Deleted ${animalName}`);

            setAnimals(prev => prev.filter(a => a.name !== animalName));
        } catch (error) {
            console.error(`Error deleting ${animalName}:`, error);
            toast.error(`Failed to delete ${animalName}`);
        }
    };

    const handleEdit = (animal) => {
        setSelectedAnimal(animal);
        setShowEditModal(true);
    };

    return (
        <div className="container mt-5 text-light">
            <h2 className="mb-4 text-center">Manage {animalType.charAt(0).toUpperCase() + animalType.slice(1)}</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="text-end mb-3">
                <Link to="/admin" className="btn btn-outline-light">Back to Dashboard</Link>
            </div>

            <div className="row g-4">
                {animals.map(animal => (
                    <div className="col-md-4 mb-4" key={animal._id}>
                        <div className="card bg-dark text-white h-100 shadow-sm">
                            <div className="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <h5 className="card-title">{animal.name}</h5>
                                    <p className="card-text mb-1">
                                        {animalType === 'dogs' ? animal.breed : animal.species}
                                    </p>
                                    <p className="card-text small mb-1">
                                        Gender: {animal.gender}
                                    </p>
                                    <p className="card-text small mb-1">
                                        Age: {animal.age} | Weight: {animal.weight}kg
                                    </p>
                                    <p className="card-text small mb-1">
                                        Status: {animal.trainingStatus}
                                    </p>
                                </div>
                                <div className="mt-auto d-flex justify-content-between align-items-center">
                                    <span className={`badge ${animal.reserved ? 'bg-danger' : 'bg-success'}`}>
                                        {animal.reserved ? 'Reserved' : 'Available'}
                                    </span>

                                    <div className="btn-group w-50">
                                        <button
                                            className="btn btn-sm btn-outline-warning w-50"
                                            onClick={() => handleEdit(animal)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-outline-danger w-50"
                                            onClick={() => handleDelete(animal.name)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <EditAnimalModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                animal={selectedAnimal}
                animalType={animalType}
                refreshAnimals={() => {
                    api.get(`/${animalType}`)
                        .then(res => setAnimals(res.data))
                        .catch(err => setError(`Error fetching ${animalType}: ${err.message}`));  
                }}
            />
        </div>
    );
}