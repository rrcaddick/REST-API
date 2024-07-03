import "reflect-metadata";
import winston, { Logger } from "winston";
import { LoggerService } from "../logger.service";
import { ILogger } from "../logger.interface";

jest.mock("winston", () => {
  const mockedFormat = jest.fn().mockImplementation(() => jest.fn());

  Object.assign(mockedFormat, {
    combine: jest.fn(),
    timestamp: jest.fn(),
    colorize: jest.fn(),
    printf: jest.fn(),
    json: jest.fn(),
  });

  return {
    addColors: jest.fn(),
    createLogger: jest.fn().mockReturnValue({
      error: jest.fn(),
      warn: jest.fn(),
      info: jest.fn(),
      http: jest.fn(),
      debug: jest.fn(),
    }),
    format: mockedFormat,
    transports: {
      Console: jest.fn(),
      File: jest.fn(),
    },
  };
});

describe("logger.service", () => {
  const message = "Test logging message";
  let logger: ILogger;
  let _logger: Logger;

  beforeEach(() => {
    logger = new LoggerService();
    _logger = winston.createLogger();
  });

  it("should add colors to winston logger config", () => {
    expect(winston.addColors).toHaveBeenCalled();
  });

  it("should add colors to winston logger config", () => {
    expect(winston.createLogger).toHaveBeenCalled();
  });

  it("should log errors through error logger", () => {
    logger.error(message);

    expect(_logger.error).toHaveBeenCalledWith(message);
  });

  it("should log warnings through warn logger", () => {
    logger.warn(message);

    expect(_logger.warn).toHaveBeenCalledWith(message);
  });

  it("should log info messages through info logger", () => {
    logger.info(message);

    expect(_logger.info).toHaveBeenCalledWith(message);
  });

  it("should log http messages through http logger", () => {
    logger.http(message);

    expect(_logger.http).toHaveBeenCalledWith(message);
  });

  it("should log debug messages through debug logger", () => {
    logger.debug(message);

    expect(_logger.debug).toHaveBeenCalledWith(message);
  });
});
