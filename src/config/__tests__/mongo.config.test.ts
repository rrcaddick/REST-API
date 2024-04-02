import "reflect-metadata";
import { connect, set, Connection } from "mongoose";
import { LoggerService } from "@logger/logger.service";
import { IDbConnection, MongoDbConnection } from "../mongodb.config";
import { ILogger } from "@root/infrastructure/logger/logger.interface";

const TEST_URI = "mongodb://localhost:27017/test";

jest.mock("mongoose", () => ({
  connect: jest.fn(),
  set: jest.fn(),
}));

const mockedLoggerFunctions = {
  error: jest.fn(),
  info: jest.fn(),
};

jest.mock("@logger/logger.service", () => {
  return {
    LoggerService: jest.fn().mockImplementation(() => mockedLoggerFunctions),
  };
});

describe("mongodb.config", () => {
  let connection: IDbConnection;
  let mockedLogger: ILogger;
  let initialProcessEnv: NodeJS.ProcessEnv;

  beforeAll(() => {
    initialProcessEnv = process.env;
  });

  beforeEach(() => {
    mockedLogger = new LoggerService();
    connection = new MongoDbConnection(mockedLogger);
  });

  afterEach(() => {
    process.env = initialProcessEnv;
    jest.clearAllMocks();
  });

  describe("connect", () => {
    it("it should throw an error if no URI is provided", async () => {
      await expect(connection.connect()).rejects.toThrow(
        "No MongoDb URI specified. Please check environment variables for MONGO_URI"
      );

      expect(mockedLoggerFunctions.error).toHaveBeenCalledWith(
        "No MongoDb URI specified. Please check environment variables for MONGO_URI"
      );

      expect(set).not.toHaveBeenCalled();

      expect(connect).not.toHaveBeenCalled();
    });

    it("it should connect successfully if correct URI is provided", async () => {
      process.env.MONGO_URI = TEST_URI;
      process.env.NODE_ENV = "development";

      const mockedConnect = jest.requireMock("mongoose").connect;
      mockedConnect.mockResolvedValueOnce({ connection: {} });

      await expect(
        connection.connect({
          mongooseOptions: { strict: false, cloneSchemas: true },
          connectionOptions: { appName: "test", authSource: "test" },
        })
      ).resolves.toBeUndefined();

      expect(set).toHaveBeenCalledWith("debug", true);
      expect(set).toHaveBeenCalledWith("strict", false);
      expect(set).toHaveBeenCalledWith("cloneSchemas", true);

      expect(connect).toHaveBeenCalledWith(TEST_URI, { appName: "test", authSource: "test" });

      expect(mockedLoggerFunctions.info).toHaveBeenCalled();
    });

    it("should throw an error if an ivalid URI is provided", async () => {
      process.env.MONGO_URI = "test";

      const mockedConnect = jest.requireMock("mongoose").connect;
      const mockError = new Error("MongoDB connection error:");
      mockedConnect.mockRejectedValueOnce(mockError);

      await expect(
        connection.connect({
          mongooseOptions: { strict: false, cloneSchemas: true },
          connectionOptions: { appName: "test", authSource: "test" },
        })
      ).rejects.toThrow("MongoDB connection error:");

      expect(connect).not.toHaveBeenCalledWith(TEST_URI, { appName: "test", authSource: "test" });

      expect(mockedLoggerFunctions.error).toHaveBeenCalled();
    });
  });

  describe("getConnection", () => {
    it("should return the connection if connected", async () => {
      // Mock environment variables
      process.env.MONGO_URI = "test-uri";
      process.env.NODE_ENV = "development";

      // Mock the connect method
      const mockedConnect = jest.requireMock("mongoose").connect;
      mockedConnect.mockResolvedValueOnce({ connection: { host: "test-host" } });

      // Call the connect method
      await connection.connect({ mongooseOptions: {}, connectionOptions: {} });

      // Expect the connection to be defined and have a property testProp with value "test"
      expect(connection.getConnection()).toBeDefined();
      expect(connection.getConnection()).toHaveProperty("host", "test-host");
    });

    it("should throw an error if not connected", () => {
      expect(() => connection.getConnection()).toThrow("No mongodb database connected. Please run connect() first");
    });
  });
});
