import express from 'express';
import Monkey from '../models/Monkey.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/monkeys
// This route creates a new monkey entry in the database.
router.post('/', authenticateAdmin, async (req, res) => {
    try {
        const monkey = new Monkey(req.body);
        const saved = await monkey.save();
        res.json(saved);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /api/monkeys
// This route retrieves all monkey entries from the database.
router.get('/', async (req, res) => {
    try {
        const monkeys = await Monkey.find();
        res.json(monkeys);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/monkeys/:name
// This route retrieves a specific monkey entry by name from the database.
router.get('/:name', async (req, res) => {
    try {
        const monkey = await Monkey.findOne({ name: req.params.name });
        if (!monkey) {
            return res.status(404).json({ error: 'Monkey not found' });
        }
        res.json(monkey);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/monkeys/:name
// This route updates a specific monkey entry by name in the database.
router.put('/:name', async (req, res) => {
    try {
        const monkey = await Monkey.findOneAndUpdate({ name: req.params.name }, req.body, { new: true });
        if (!monkey) {
            return res.status(404).json({ error: 'Monkey not found' });
        }
        res.json(monkey);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/monkeys/:name
// This route deletes a specific monkey entry by name from the database.
router.delete('/:name', authenticateAdmin, async (req, res) => {
    try {
        const monkey = await Monkey.findOneAndDelete({ name: req.params.name });
        if (!monkey) {
            return res.status(404).json({ error: 'Monkey not found' });
        }
        res.json({ message: 'Monkey deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;