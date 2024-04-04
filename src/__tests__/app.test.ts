import "reflect-metadata";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { App } from "@root/app";
import { LoggerService } from "@logger";
import express, { Router, urlencoded, json } from "express";
import { MongoDbConnection } from "@config/mongodb.config";

const mockedAppFunctions = {
  listen: jest.fn((port: number, callback: () => void) => {
    callback();
  }),
  use: jest.fn(),
};

const mockedRouterFunctions = {
  use: jest.fn(),
};

const mockedExpressFunctions = {};

jest.mock("express", () => {
  const mockedExpress = jest.fn(() => mockedAppFunctions);

  Object.assign(mockedExpress, {
    Router: jest.fn(() => mockedRouterFunctions),
    urlencoded: jest.fn(),
    json: jest.fn(),
  });

  return mockedExpress;
});

jest.mock("cookie-parser", () => jest.fn());

jest.mock("morgan", () => jest.fn());

const mockedLoggerFunctions = {
  http: jest.fn(),
  debug: jest.fn(),
};

jest.mock("@logger/logger.service", () => ({
  LoggerService: jest.fn(() => mockedLoggerFunctions),
}));

const mockedDbFunctions = {
  connect: jest.fn(),
};

jest.mock("@config/mongodb.config", () => ({
  MongoDbConnection: jest.fn(() => mockedDbFunctions),
}));

describe("app", () => {
  const PORT = 5000;
  let app: App;

  beforeEach(() => {
    const mockedLogger = new LoggerService();
    const mockedDb = new MongoDbConnection(mockedLogger);

    app = new App(mockedLogger, mockedDb);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("constructor", () => {
    it("should init middleware correctly", () => {
      expect(urlencoded).toHaveBeenCalledTimes(1);
      expect(json).toHaveBeenCalledTimes(1);
      expect(cookieParser).toHaveBeenCalledTimes(1);
      expect(morgan).toHaveBeenCalledTimes(1);
    });
  });

  describe("getApp", () => {
    it("should return an express app", () => {
      expect(express).toHaveBeenCalledTimes(1);

      const expressApp = app.getApp();
      expect(expressApp).toMatchObject(express());
      expect(expressApp).toHaveProperty("use");
      expect(expressApp).toHaveProperty("listen");
    });
  });

  describe("getRouter", () => {
    it("should return an express router", () => {
      expect(Router).toHaveBeenCalledTimes(1);

      const router = app.getRouter();
      expect(router).toHaveProperty("use");
    });
  });

  describe("start", () => {
    it("should connect the db", async () => {
      await app.start(PORT);

      const { connect } = mockedDbFunctions;
      expect(connect).toHaveBeenCalledTimes(1);
    });

    it("should listen on the correct port", async () => {
      await app.start(PORT);

      const { listen } = mockedAppFunctions;
      const { debug } = mockedLoggerFunctions;

      expect(listen).toHaveBeenCalledTimes(1);
      expect(debug).toHaveBeenCalledWith(`App started on port ${PORT}`);
    });
  });

  describe("addMiddleware", () => {
    it("should add middelware to the router", () => {
      app.addMiddleware(() => {});

      const { use } = mockedRouterFunctions;
      expect(use).toHaveBeenCalledTimes(1);
    });
  });
});
