import { Express, Request, Response, NextFunction } from "express";
import { Router } from "../common/router";
import User from "../models/user";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class AuthRouter extends Router {
    applyRoutes(app: Express) {
        app.post('/auth/signup', async (req: Request, res: Response, next: NextFunction) => {
            const { name, email, password, confirmPassword } = req.body;
            
            if(!name || !email || !password || !confirmPassword ) {
              return res.status(400).json({ message: 'All fields are required' });
            }
          
            if(password !== confirmPassword) {
              return res.status(400).json({ message: 'Passwords do not match' });
            }
          
            if(await User.findOne({ email })) {
              return res.status(400).json({ message: 'User already exists' });
            }
          
            // Hash Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
          
            const user = new User({
              name,
              email,
              password: hashedPassword
            });
          
            try {
              await user.save();
              res.status(201).json({ message: 'User created successfully' });
            } catch (error) {
              console.log(error);
              res.status(500).json({ message: 'Error creating user, try again later' });
            }
          })
          
          app.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {
            const { email, password } = req.body;
          
            if(!email || !password) {
              return res.status(400).json({ message: 'All fields are required' });
            }
          
            const user = await User.findOne({ email: email });
            if(!user) {
              return res.status(400).json({ message: 'Invalid credentials' });
            }
          
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid) {
              return res.status(400).json({ message: 'Invalid credentials' });
            }
          
            try {
              const apiSecret = process.env.API_SECRET;
              if(apiSecret) {
                const token = jwt.sign({ id: user._id}, apiSecret)
                return res.status(200).json({ 
                  message: 'Authentication successful',
                  user: user.name,
                  token: token
                });
              } else {
                console.log('API secret not found');
                return res.status(500).json({ message: 'Error logging in, try again later' });
              }
            } catch (error) {
              console.log(error);
              return res.status(500).json({ message: 'Error logging in, try again later' });
            }
          });
    }
}

export const authRouter = new AuthRouter();