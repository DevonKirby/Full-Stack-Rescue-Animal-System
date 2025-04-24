import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';

export default function AnimalList({ animalType }) {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        api.get(`/${animalType}`)
            .then((res) => setAnimals(res.data))
            .catch((err) => console.error(`Error fetching ${animalType}:`, err));
    }, [animalType]);

    return (
        <div className="container mt-5 text-light">
            <h2 className="text-center mb-4">
                All {animalType === 'dogs' ? 'Dogs' : 'Monkeys'}
            </h2>

            <div className="text-end mb-3">
                <Link to="/" className="btn btn-outline-light">Back to Home</Link>
            </div>
            <div className="row">
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
                                <div>
                                    <span className={`badge ${animal.reserved ? 'bg-danger' : 'bg-success'}`}>
                                        {animal.reserved ? 'Reserved' : 'Available'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}