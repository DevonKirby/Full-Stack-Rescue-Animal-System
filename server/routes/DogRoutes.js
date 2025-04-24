import express from 'express';
import Dog from '../models/Dog.js';

const router = express.Router();

// POST /api/dogs
// This route creates a new dog entry in the database.
router.post('/', async (req, res) => {
    try {
        const dog = new Dog(req.body);
        const saved = await dog.save();
        res.json(saved);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /api/dogs
// This route retrieves all dog entries from the database.
router.get('/', async (req, res) => {
    try {
        const dogs = await Dog.find();
        res.json(dogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/dogs/:name
// This route retrieves a specific dog entry by name from the database.
router.get('/:name', async (req, res) => {
    try {
        const dog = await Dog.findOne({ name: req.params.name });
        if (!dog) {
            return res.status(404).json({ error: 'Dog not found' });
        }
        res.json(dog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;