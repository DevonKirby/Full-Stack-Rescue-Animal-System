import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'devsecretkey';

export function authenticateAdmin(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid token' });
    }
    
    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, SECRET);
        req.admin = payload;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
}