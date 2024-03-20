import winston, { Logger as WinstonLogger, format } from "winston";
import { getEnv, isDevelopment, parseEnumToObject } from "../utils/global";

const { combine, timestamp, json, colorize, printf } = format;

enum Levels {
  error = 0,
  warn = 1,
  info = 2,
  http = 3,
  debug = 4,
}

class Logger {
  private static logger: WinstonLogger;

  private static colors: Record<keyof typeof Levels, string> = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
  };

  static getLogger() {
    if (!Logger.logger) {
      Logger.logger = Logger.initLogger();
      winston.addColors(Logger.colors);
    }

    return Logger.logger;
  }

  private static consoleFormat() {
    return format.combine(
      timestamp(),
      colorize({ all: true }),
      printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    );
  }

  private static errorFilter() {
    return format((info, opts) => {
      return info.level === "error" ? info : false;
    })();
  }

  private static infoFilter() {
    return format((info, opts) => {
      return info.level === "info" ? info : false;
    })();
  }

  private static initLogger(): WinstonLogger {
    return winston.createLogger({
      level: isDevelopment() ? "debug" : getEnv("LOG_LEVEL"),
      levels: parseEnumToObject(Levels),
      exceptionHandlers: [new winston.transports.File({ filename: "logs/exceptions.log" })],
      rejectionHandlers: [new winston.transports.File({ filename: "logs/rejections.log" })],
      transports: [
        new winston.transports.Console({
          format: Logger.consoleFormat(),
        }),
        new winston.transports.File({
          filename: "logs/combined.log",
        }),
        new winston.transports.File({
          filename: "logs/app-error.log",
          level: "error",
          format: combine(Logger.errorFilter(), timestamp(), json()),
        }),
        new winston.transports.File({
          filename: "logs/app-info.log",
          level: "info",
          format: combine(Logger.infoFilter(), timestamp(), json()),
        }),
      ],
    });
  }
}

export const logger = Logger.getLogger();
