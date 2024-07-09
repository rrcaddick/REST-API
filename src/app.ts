import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { inject, injectable, singleton } from "tsyringe";
import express, { urlencoded, json, Express, Router, RequestHandler, Request, Response } from "express";
import { ILogger } from "@logger/logger.interface";
import { RegisterRoutes } from "@root/routes";
import { IDataSource } from "@config/db.config.interface";
import { IErrorHandler } from "@middleware/error-handler.interafce";
// import { IDbConnection } from "@config/mongodb.config";
// import swaggerUi from "swagger-ui-express";
// import { UserService } from "./domain/user";

@injectable()
@singleton()
export class App {
  private app: Express = express();
  private router: Router = Router();

  constructor(
    @inject("Logger") private logger: ILogger,
    @inject("DataSource") private dataSource: IDataSource,
    @inject("ErrorHandler") private errorHandler: IErrorHandler
  ) {
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

    // Serve static files for spectacle docs
    app.use(express.static(path.join(__dirname, "public")));

    app.use("/docs", (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "public", "index.html"));
    });

    // TODO: Register normal swagger docs for employee testing

    // Error handler
    app.use(this.errorHandler.handleValidationError.bind(this.errorHandler));

    // Not found
    app.use(this.errorHandler.handleNotFound.bind(this.errorHandler));
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
