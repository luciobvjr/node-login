import User from "../models/user";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

class AuthService {
    async createUser(name: string, email: string, password: string) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        return user;
    }

    async getUserByCredentials(email: string, password: string) {
        const user = await User.findOne({ email: email });
        if (!user) {
            return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return null;
        }

        return user;
    }

    async generateAccessToken(userID: Types.ObjectId) {
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        if (accessTokenSecret) {
            const token = jwt.sign({ id: userID }, accessTokenSecret, { expiresIn: '30m' });
            return token;
        }
        throw new Error('Access token secret not found');
    }

    async generateRefreshToken(userID: Types.ObjectId) {
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
        if (refreshTokenSecret) {
            const token = jwt.sign({ id: userID }, refreshTokenSecret, { expiresIn: '7d' });
            return token;
        }
        throw new Error('Refresh token secret not found');
    }
}

const authService = new AuthService();
export default authService;