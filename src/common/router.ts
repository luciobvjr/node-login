import { Express } from "express";

export abstract class Router {
    abstract applyRoutes(app: Express): any
}