import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

class PrivateController {
    async checkToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).send({ message: 'Token is required' });
        }

        try {
            const apiSecret = process.env.API_SECRET;
            if (!apiSecret) {
                throw new Error('API_SECRET is not defined');
            }
            const object = jwt.verify(token, apiSecret);
            res.status(200).send({ message: 'Token is valid', object });
        } catch (error) {
            res.status(403).send({ message: 'Token is invalid' });
        }
    }
}

const privateController = new PrivateController();
export default privateController;