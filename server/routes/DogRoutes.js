import express from 'express';
import Dog from '../models/Dog.js';

const router = express.Router();

// POST /api/dogs
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
router.get('/', async (req, res) => {
    try {
        const dogs = await Dog.find();
        res.json(dogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;