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

    async generateToken(userID: Types.ObjectId) {
        const apiSecret = process.env.API_SECRET;
        if (apiSecret) {
            const token = jwt.sign({ id: userID }, apiSecret);
            return token;
        }
        throw new Error('API secret not found');
    }
}

const authService = new AuthService();
export default authService;