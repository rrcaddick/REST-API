import express, { Express, Router } from "express";

export class ExpressApp {
  private static app: Express;
  private static router: Router;

  static getApp() {
    if (!ExpressApp.app) {
      ExpressApp.app = express();
    }
    return ExpressApp.app;
  }

  static getRouter() {
    if (!ExpressApp.router) {
      ExpressApp.router = Router();
    }
    return ExpressApp.router;
  }
}
