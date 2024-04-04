import "reflect-metadata";
import "@config/di.config";
import { NextFunction, Request, Response } from "express";
import { controller, get, post, put, patch, del } from "@controllers/decorators";
import { MetadataKeys } from "../types/MetadataKeys";

// Mock App and router
const mockRouter = {
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

const mockApp = {
  getRouter: jest.fn(() => mockRouter),
};

jest.mock("@root/app", () => ({
  App: jest.fn(() => mockApp),
}));

@controller("/api")
class TestController {
  @get("/get")
  get(req: Request, res: Response, next: NextFunction) {}

  @post("/post")
  post(req: Request, res: Response, next: NextFunction) {}

  @put("/put")
  put(req: Request, res: Response, next: NextFunction) {}

  @patch("/patch")
  patch(req: Request, res: Response, next: NextFunction) {}

  @del("/del")
  del(req: Request, res: Response, next: NextFunction) {}
}

describe("route.decorator", () => {
  it("should have register route info metadata", () => {
    const getRouteInfo = Reflect.getMetadata(MetadataKeys.RouteInfo, TestController.prototype, "get");
    const postRouteInfo = Reflect.getMetadata(MetadataKeys.RouteInfo, TestController.prototype, "post");
    const putRouteInfo = Reflect.getMetadata(MetadataKeys.RouteInfo, TestController.prototype, "put");
    const patchRouteInfo = Reflect.getMetadata(MetadataKeys.RouteInfo, TestController.prototype, "patch");
    const delRouteInfo = Reflect.getMetadata(MetadataKeys.RouteInfo, TestController.prototype, "del");

    expect(getRouteInfo).toEqual({ path: "/get", method: "get" });
    expect(postRouteInfo).toEqual({ path: "/post", method: "post" });
    expect(putRouteInfo).toEqual({ path: "/put", method: "put" });
    expect(patchRouteInfo).toEqual({ path: "/patch", method: "patch" });
    expect(delRouteInfo).toEqual({ path: "/del", method: "delete" });
  });
});
