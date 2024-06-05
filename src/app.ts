import morgan from "morgan";
import cookieParser from "cookie-parser";
import { inject, injectable, singleton } from "tsyringe";
import express, { urlencoded, json, Express, Router, RequestHandler, Request, Response } from "express";
// import { IDbConnection } from "@config/mongodb.config";
import { ILogger } from "@logger/logger.interface";
import { RegisterRoutes } from "./routes";
// import swaggerUi from "swagger-ui-express";
// import { UserService } from "./domain/user";
import path from "path";
import { IDataSource } from "./config/db.config.interface";

@injectable()
@singleton()
export class App {
  private app: Express = express();
  private router: Router = Router();

  constructor(@inject("Logger") private logger: ILogger, @inject("DataSource") private dataSource: IDataSource) {
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

    RegisterRoutes(this.app);

    app.use(express.static(path.join(__dirname, "public")));

    // Register Swagger Documentation
    app.use("/docs", (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "public", "index.html"));
    });
  }

  private async connectDb(): Promise<void> {
    await this.dataSource.connect();
  }

  getApp(): Express {
    return this.app;
  }

  getRouter(): Router {
    return this.router;
  }

  async start(port: number): Promise<void> {
    await this.connectDb();

    this.app.listen(port, () => {
      this.logger.debug(`App started on port ${port}`);
    });
  }

  addMiddleware(middleware: RequestHandler): void {
    this.router.use(middleware);
  }
}
