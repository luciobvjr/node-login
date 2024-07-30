import { Express } from "express";
import { Router } from "../common/router";
import { authController } from "../controllers/auth.controller";

class AuthRouter extends Router {
    applyRoutes(app: Express) {
        app.post('/auth/signup', authController.createUser);
        app.post('/auth/login', authController.authenticateUser);
        app.get('/auth/refresh-token', authController.refreshToken);
    }
}

export const authRouter = new AuthRouter();