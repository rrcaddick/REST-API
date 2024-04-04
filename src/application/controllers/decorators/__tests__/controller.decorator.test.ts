import "reflect-metadata";
import "@config/di.config";
import { NextFunction, Request, Response } from "express";
import { controller, get, post, patch } from "@controllers/decorators";


const mockRouter = {
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  put: jest.fn(),
  stack: [],
};

const mockApp = {
  getRouter: jest.fn(() => mockRouter),
};

jest.mock("@root/app", () => ({
  App: jest.fn(() => mockApp),
}));

@controller("/api")
class TestController1 {
  @get("/test1")
  getTest1(req: Request, res: Response, next: NextFunction) {}

  @get("/test2")
  getTest2(req: Request, res: Response, next: NextFunction) {}

  patchApiTest(req: Request, res: Response, next: NextFunction) {}
}

@controller("api")
class TestController2 {
  @patch("test1")
  patchTest1(req: Request, res: Response, next: NextFunction) {}

  @patch("test2")
  patchTest2(req: Request, res: Response, next: NextFunction) {}
}

@controller()
class TestController3 {
  @post("/test1")
  postTest1(req: Request, res: Response, next: NextFunction) {}

  @post("/test2")
  postTest2(req: Request, res: Response, next: NextFunction) {}
}

describe("controller.decorator", () => {
  it("should not register undecorated routes", () => {
    expect(mockRouter.put).not.toHaveBeenCalledWith("/api/test", TestController1.prototype.patchApiTest);
  });

  it("should register routes with correct prefix and http method", () => {
    // Prefix and routes start with /
    expect(mockRouter.get).toHaveBeenCalledWith("/api/test1", TestController1.prototype.getTest1);
    expect(mockRouter.get).toHaveBeenCalledWith("/api/test2", TestController1.prototype.getTest2);

    // Prefix and routes don't start with /
    expect(mockRouter.patch).toHaveBeenCalledWith("/api/test1", TestController2.prototype.patchTest1);
    expect(mockRouter.patch).toHaveBeenCalledWith("/api/test2", TestController2.prototype.patchTest2);
  });

  it("should register routes without prefix correct", () => {
    expect(mockRouter.post).toHaveBeenCalledWith("/test1", TestController3.prototype.postTest1);
    expect(mockRouter.post).toHaveBeenCalledWith("/test2", TestController3.prototype.postTest2);
  });
});
