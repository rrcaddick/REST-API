import { ValidateError } from "tsoa";
import { Request, Response, NextFunction } from "express";
import { ILogger } from "@logger/logger.interface";
import { inject, injectable, singleton } from "tsyringe";
import { IErrorHandler } from "@middleware/error-handler.interafce";

@injectable()
@singleton()
export class ErrorHandler implements IErrorHandler {
  constructor(@inject("Logger") private logger: ILogger) {}

  public handleValidationError(error: unknown, req: Request, res: Response, next: NextFunction): Response | void {
    if (error instanceof ValidateError) {
      this.logger.warn(`Caught Validation Error for ${req.path}:`, error.fields);
      return res.status(422).json({
        message: "Validation Failed",
        details: error?.fields,
      });
    }

    if (error instanceof Error) {
      this.logger.error(error.message);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }

    return next();
  }

  public handleNotFound(req: Request, res: Response): Response {
    this.logger.http(`Unavailable resource requested for path ${req.path}`);
    return res.status(404).send({
      message: `No resource found at ${req.path}`,
    });
  }
}
