import express from 'express';
import Monkey from '../models/Monkey.js';

const router = express.Router();

// POST /api/monkeys
router.post('/', async (req, res) => {
    try {
        const monkey = new Monkey(req.body);
        const saved = await monkey.save();
        res.json(saved);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET /api/monkeys
router.get('/', async (req, res) => {
    try {
        const monkeys = await Monkey.find();
        res.json(monkeys);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;