import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'Token is required' });
    }

    try {
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        if (!accessTokenSecret) {
            throw new Error('Access token secret not found');
        }
        const object = jwt.verify(token, accessTokenSecret);
        req.body.object = object;
        next();
    } catch (error) {
        res.status(403).send({ message: 'Token is invalid' });
    }
}