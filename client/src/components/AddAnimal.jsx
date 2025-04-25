import React, { useState } from 'react';
import api from '../api.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function AddAnimal() {
    const [animalType, setAnimalType] = useState('dogs');
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        species: '',
        gender: '',
        age: '',
        weight: '',
        trainingStatus: '',
        reserved: false,
        inServiceCountry: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cleanedData = { ...formData };
        if (animalType === 'dogs') {
            delete cleanedData.species; // Remove species for dogs
        }
        if (animalType === 'monkeys') {
            delete cleanedData.breed; // Remove breed for monkeys
        }

        console.log('Form data:', formData);
        try {
            await api.post(`/${animalType}`, formData);
            toast.success('Animal added successfully!');
            navigate('/admin');
        } catch (error) {
            console.error('Error adding animal:', error);

            let userMessage = 'Failed to add animal. Please try again.';

            const serverError = error.response?.data?.error;

            if (serverError) {
                if (serverError.includes('duplicate key') || serverError.includes('already exists')) {
                    userMessage = 'An animal with this name already exists.';
                } else if (serverError.includes('validation failed') || serverError.includes('required')) {
                    userMessage = 'Please fill in all required fields correctly.';
                } else if (error.response.status === 401) {
                    userMessage = 'Unauthorized. Please log in again.';
                } else {
                    userMessage = 'Server error. Please contact support if this continues.';
                }
            }

            toast.error(userMessage);
        }
    };

    return (
        <div className="container mt-5 text-light">
            <h2 className="text-center mb-4">Add New Animal</h2>

            <div className="text-end mb-3">
                <Link to="/admin" className="btn btn-outline-light">Back to Dashboard</Link>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Animal Type</label>
                    <select
                        className="form-select"
                        name="animalType"
                        value={animalType}
                        onChange={(e) => setAnimalType(e.target.value)}
                    >
                        <option value="dogs">Dog</option>
                        <option value="monkeys">Monkey</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                {animalType === 'dogs' ? (
                    <div className="mb-3">
                        <label className="form-label">Breed</label>
                        <input
                            type="text"
                            className="form-control"
                            name="breed"
                            value={formData.breed}
                            onChange={handleChange}
                            required
                        />
                    </div>
                ) : (
                    <div className="mb-3">
                        <label className="form-label">Species</label>
                        <input
                            type="text"
                            className="form-control"
                            name="species"
                            value={formData.species}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <input
                        type="text"
                        className="form-control"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                        type="number"
                        className="form-control"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Weight (kg)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Training Status</label>
                    <input
                        type="text"
                        className="form-control"
                        name="trainingStatus"
                        value={formData.trainingStatus}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Country</label>
                    <input
                        type="text"
                        className="form-control"
                        name="inServiceCountry"
                        value={formData.inServiceCountry}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Add Animal
                </button>
            </form>
        </div>
    );
}