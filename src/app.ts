import cookieParser from "cookie-parser";
import express, { urlencoded, json, Express, Router, RequestHandler } from "express";
import { MongoDbConnection } from "./config/MongoDb";
import { logger } from "./services/Logger";
import morgan from "morgan";

export class App {
  private static app: Express;
  private static router: Router;

  constructor() {
    if (!App.app) {
      App.app = express();
    }

    if (!App.router) {
      App.router = Router();
    }
  }

  private async connectDb(): Promise<void> {
    await MongoDbConnection.connect();
  }

  private initMiddleware(): void {
    const app = App.app;

    // Body Parser
    app.use(urlencoded({ extended: true }));

    // JSON Parser
    app.use(json());

    // Cookie Parser
    app.use(cookieParser());

    // Log incomeing requests with Morgan
    // TODO: Change logger to singleton
    app.use(
      morgan("combined", {
        stream: {
          write: (message) => {
            logger.info(message.trim());
          },
        },
      })
    );

    // Add express routes
    app.use(App.router);
  }

  static getApp(): Express {
    if (!App.app) {
      App.app = express();
    }
    return App.app;
  }

  getApp(): Express {
    return App.app;
  }

  static getRouter(): Router {
    if (!App.router) {
      App.router = Router();
    }

    return App.router;
  }

  getRouter(): Router {
    return App.router;
  }

  async start(port: number): Promise<void> {
    await this.connectDb();
    this.initMiddleware();

    App.app.listen(port, () => {
      logger.debug(`Started app on port ${port}`);
    });
  }

  addMiddleware(middleware: RequestHandler): void {
    App.arguments(middleware);
  }
}
