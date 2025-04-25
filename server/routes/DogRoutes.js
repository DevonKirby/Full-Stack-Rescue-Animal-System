import express from 'express';
import Dog from '../models/Dog.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/dogs
// This route creates a new dog entry in the database.
router.post('/', authenticateAdmin, async (req, res) => {
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

// PUT /api/dogs/:name/reserve
// This route updates the reservation status of a specific dog entry by name in the database.
router.put('/:name/reserve', async (req, res) => {
    if (typeof req.body.reserved !== 'boolean') {
        return res.status(400).json({ error: 'Invalid reservation status' });
    }

    try {
        const dog = await Dog.findOneAndUpdate(
            { name: req.params.name },
            { reserved: req.body.reserved },
            { new: true }
        )
        if (!dog) {
            return res.status(404).json({ error: 'Dog not found' });
        }
        res.json(dog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/dogs/:name
// This route updates a specific dog entry by name in the database.
router.put('/:name', authenticateAdmin, async (req, res) => {
    try {
        const dog = await Dog.findOneAndUpdate({ name: req.params.name }, req.body, { new: true });
        if (!dog) {
            return res.status(404).json({ error: 'Dog not found' });
        }
        res.json(dog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/dogs/:name
// This route deletes a specific dog entry by name from the database.
router.delete('/:name', authenticateAdmin, async (req, res) => {
    try {
        const dog = await Dog.findOneAndDelete({ name: req.params.name });
        if (!dog) {
            return res.status(404).json({ error: 'Dog not found' });
        }
        res.json({ message: 'Dog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;