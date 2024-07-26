import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import User from '../models/user';

class PrivateController {
    async getPrivateContent(req: Request, res: Response, next: NextFunction) {
        const userID = req.body.object.id;
        const user = await User.findById(userID, { password: 0 });
        res.send({
            message: 'Private content',
            user: user
        });
    }
}

const privateController = new PrivateController();
export default privateController;