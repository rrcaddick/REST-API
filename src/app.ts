import cookieParser from "cookie-parser";
import express, { urlencoded, json, Express, Router, RequestHandler } from "express";
import { MongoDbConnection } from "./config/MongoDb";
import { WinstonLogger } from "./services/Logger";
import morgan from "morgan";
import { container, singleton } from "tsyringe";

const logger = container.resolve(WinstonLogger).getLogger();

@singleton()
export class App {
  private app: Express = express();
  private router: Router = Router();

  constructor() {
    this.app = express();
    this.router = Router();
    this.initMiddleware();
  }

  private initMiddleware(): void {
    const app = this.app;

    // Body Parser
    app.use(urlencoded({ extended: true }));

    // JSON Parser
    app.use(json());

    // Cookie Parser
    app.use(cookieParser());

    // Log incoming requests with Morgan
    app.use(
      morgan("combined", {
        stream: {
          write: (message) => {
            logger.http(message.trim());
          },
        },
      })
    );

    // Add express routes
    app.use(this.router);
  }

  getApp(): Express {
    return this.app;
  }

  getRouter(): Router {
    return this.router;
  }

  private async connectDb(): Promise<void> {
    const db = container.resolve(MongoDbConnection);
    await db.connect();
  }

  async start(port: number): Promise<void> {
    await this.connectDb();

    this.app.listen(port, () => {
      logger.debug(`Started app on port ${port}`);
    });
  }

  addMiddleware(middleware: RequestHandler): void {
    this.app.use(middleware);
  }
}
