import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../api.js';
import { toast } from 'react-toastify';

export default function EditAnimalModal({ show, handleClose, animal, animalType, refreshAnimals }) {
    const [formData, setFormData] = useState({ ...animal });

    useEffect(() => {
        if (animal) {
            setFormData({ ...animal });
        }
    }, [animal]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const cleanedData = { ...formData };
            
            if (animalType === 'dogs') {
                delete cleanedData.species;
            } else {
                delete cleanedData.breed;
            }

            await api.put(`/${animalType}/${animal.name}`, cleanedData);
            toast.success(`Updated ${animal.name}`);
            refreshAnimals();
            handleClose();
        } catch (error) {
            console.error(`Error updating ${animal.name}:`, error);
            toast.error(`Failed to update ${animal.name}`);
        }
    };

    if (!animal) {
        return null; // or a loading spinner
    }

    return (
        <Modal show={show} onHide={handleClose} centered backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Edit {animal.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    {animalType === 'dogs' ? (
                        <Form.Group className="mb-3">
                            <Form.Label>Breed</Form.Label>
                            <Form.Control
                                type="text"
                                name="breed"
                                value={formData.breed}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    ) : (
                        <Form.Group className="mb-3">
                            <Form.Label>Species</Form.Label>
                            <Form.Control
                                type="text"
                                name="species"
                                value={formData.species}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    )}

                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                            type="text"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Weight (kg)</Form.Label>
                        <Form.Control
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Training Status</Form.Label>
                        <Form.Control
                            type="text"
                            name="trainingStatus"
                            value={formData.trainingStatus}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            name="inServiceCountry"
                            value={formData.inServiceCountry}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}