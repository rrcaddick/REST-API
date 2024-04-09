import morgan from "morgan";
import cookieParser from "cookie-parser";
import { inject, injectable, singleton } from "tsyringe";
import express, { urlencoded, json, Express, Router, RequestHandler, Request, Response } from "express";
import { IDbConnection } from "@config/mongodb.config";
import { ILogger } from "@logger/logger.interface";
import { RegisterRoutes } from "./routes";
import swaggerUi from "swagger-ui-express";
import { UserService } from "./domain/user";

@injectable()
@singleton()
export class App {
  private app: Express = express();
  private router: Router = Router();

  constructor(@inject("Logger") private logger: ILogger, @inject("DbConnection") private dbConnection: IDbConnection) {
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

    app.use("/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
      return res.send(swaggerUi.generateHTML(await import("../dist/swagger.json")));
    });
  }

  private async connectDb(): Promise<void> {
    await this.dbConnection.connect();
  }

  async testUserService() {
    const userService = new UserService();

    const user = await userService.get("66142385fd403448124617b1");

    console.log("User Service", user);
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
