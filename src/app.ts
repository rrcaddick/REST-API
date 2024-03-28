import morgan from "morgan";
import cookieParser from "cookie-parser";
import { inject, injectable, singleton } from "tsyringe";
import express, { urlencoded, json, Express, Router, RequestHandler } from "express";
import { IDbConnection } from "@config/mongodb.config";
import { ILogger } from "@logger/logger.interface";

@singleton()
@injectable()
export class App {
  private app: Express = express();
  private router: Router = Router();

  constructor(@inject("Logger") private logger: ILogger, @inject("DbConnection") private dbConnection: IDbConnection) {
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
            this.logger.http(message.trim());
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
    await this.dbConnection.connect();
  }

  async start(port: number): Promise<void> {
    await this.connectDb();

    this.app.listen(port, () => {
      this.logger.debug(`App started on port ${port}`);
    });
  }

  addMiddleware(middleware: RequestHandler): void {
    this.app.use(middleware);
  }
}
