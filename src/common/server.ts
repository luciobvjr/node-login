import express, { Express } from "express"
import http from "http";
import { Router } from "./router";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import 'dotenv/config';

export class Server {
    app: Express = express();

    async bootstrap(routers: Router[]): Promise<http.Server> {
        await this.initDB();
        const server = await this.initServer(routers);
        return server;
    }

    async initServer(routers: Router[]): Promise<http.Server> {
        return new Promise((resolve, reject) => {
            try {
                const httpServer = http.createServer(this.app);

                // Middlewares
                this.app.use(bodyParser.json())
                this.app.use(bodyParser.urlencoded({ extended: true }))

                // Apply Routers
                for(const router of routers) {
                    router.applyRoutes(this.app);
                }

                httpServer.listen(4200, () => {
                    resolve(httpServer)
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async initDB() {
        const dbUser = process.env.DB_USER;
        const dbPass = process.env.DB_PASS;
        const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.lw7gjyi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

        (<any>mongoose).Promise = global.Promise;
        return mongoose.connect(uri).then((db) => { 
            console.log('Connected to MongoDB');
        })
        .catch(err => console.error('Error connecting to MongoDB:', err));
    }
}