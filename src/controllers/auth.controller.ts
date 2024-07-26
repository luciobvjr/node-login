import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authService from "../services/auth.service";

class AuthController {
    async createUser(req: Request, res: Response, next: NextFunction) {
        const { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        if (await User.findOne({ email })) {
            return res.status(400).json({ message: 'User already exists' });
        }

        try {
            const user = await authService.createUser(name, email, password);
            res.status(201).json({ message: 'User created successfully', user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error creating user, try again later' });
        }
    }

    async authenticateUser(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await authService.getUserByCredentials(email, password);

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        try {
            const token = await authService.generateToken(user._id);
            return res.status(200).json({
                message: 'Authentication successful',
                user: user.name,
                token: token
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error logging in, try again later' });
        }
    }
}

export const authController = new AuthController();