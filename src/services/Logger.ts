import winston, { Logger, format } from "winston";
import { getEnv, isDevelopment, parseEnumToObject } from "../utils/global";
import { singleton } from "tsyringe";

const { combine, timestamp, json, colorize, printf } = format;

enum Levels {
  error = 0,
  warn = 1,
  info = 2,
  http = 3,
  debug = 4,
}

@singleton()
export class WinstonLogger {
  private logger: Logger;

  private colors: Record<keyof typeof Levels, string> = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white",
  };

  constructor() {
    winston.addColors(this.colors);
    this.logger = this.initLogger();
  }

  getLogger() {
    return this.logger;
  }

  private consoleFormat() {
    return format.combine(
      timestamp(),
      colorize({ all: true }),
      printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    );
  }

  private levelFilter(level: string) {
    return format((info, opts) => {
      return info.level === level ? info : false;
    })();
  }

  private initLogger(): Logger {
    return winston.createLogger({
      level: isDevelopment() ? "debug" : getEnv("LOG_LEVEL"),
      levels: parseEnumToObject(Levels),
      exceptionHandlers: [new winston.transports.File({ filename: "logs/exceptions.log" })],
      rejectionHandlers: [new winston.transports.File({ filename: "logs/rejections.log" })],
      transports: [
        new winston.transports.Console({
          format: this.consoleFormat(),
        }),
        new winston.transports.File({
          filename: "logs/combined.log",
        }),
        new winston.transports.File({
          filename: "logs/app-error.log",
          level: "error",
          format: combine(this.levelFilter("error"), timestamp(), json()),
        }),
        new winston.transports.File({
          filename: "logs/app-info.log",
          level: "info",
          format: combine(this.levelFilter("info"), timestamp(), json()),
        }),
      ],
    });
  }
}
