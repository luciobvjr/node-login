import { Express } from "express";
import { Router } from "../common/router";
import privateController from "../controllers/private.controller";
import { checkToken } from "../common/checktoken.middleware";

class PrivateRouter extends Router {
    applyRoutes(app: Express) {
        app.get('/private', checkToken, privateController.getPrivateContent);
    }
}

export const privateRouter = new PrivateRouter();