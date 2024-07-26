import { Express } from "express";
import { Router } from "../common/router";
import privateController from "../controllers/private.controller";

class PrivateRouter extends Router {
    applyRoutes(app: Express) {
        app.get('/private', privateController.checkToken);
    }
}

export const privateRouter = new PrivateRouter();