import { NextFunction, Request, Response } from "express";

export interface IErrorHandler {
  handleValidationError(error: unknown, req: Request, res: Response, next: NextFunction): Response | void;
  handleNotFound(req: Request, res: Response): Response;
}
