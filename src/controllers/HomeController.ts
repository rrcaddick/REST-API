import { NextFunction, Request, Response } from "express";
import { get, controller } from "./decorators";

@controller()
export class HomeController {
  @get("/")
  getHome(req: Request, res: Response, next: NextFunction): void {
    res.send("Hello World!");
  }
}
