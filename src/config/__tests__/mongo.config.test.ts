import "reflect-metadata";
import { MongoDbConnection } from "@config/mongodb.config";
import { connect, set } from "mongoose";
import { getEnv, isDevelopment } from "@utils/env";

jest.mock("mongoose", () => ({
  connect: jest.fn(),
  set: jest.fn(),
}));

jest.mock("@utils/env", () => ({
  getEnv: jest.fn(),
  isDevelopment: jest.fn(),
}));

jest.mock("@logger/logger.service", () => ({
  WinstonLogger: jest.fn().mockImplementation(() => ({
    getLogger: jest.fn().mockReturnValue({
      info: jest.fn(),
      error: jest.fn(),
    }),
  })),
}));

describe("MongoDbConnection", () => {
  describe("connect", () => {
    it("should throw an error if no URI is undefined", () => {});

    it("should correctly set MongooseOptions", () => {});

    it("should correctly set ConnectOptions", () => {});

    it("should connect to mongoDb if uri is correct", () => {});

    it("should not attempt to connect if connection already exist", () => {});

    it("should throw and log an error if connection fails", () => {});
  });

  describe("getConnection", () => {
    it("should return connection object if connected", () => {});

    it("should throw an error if not connected", () => {});
  });
});
