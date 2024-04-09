import winston, { Logger, format } from "winston";
import { parseEnumToObject } from "@utils/enum";
import { getEnv, isDevelopment } from "@utils/env";
import { injectable, singleton } from "tsyringe";
import { ILogger } from "@logger/logger.interface";
import { Levels } from "@logger/logger.enum";

const { combine, timestamp, json, colorize, printf } = format;

@singleton()
@injectable()
export class LoggerService implements ILogger {
  private logger: Logger;

  // Ensures that colors stays in sync with the Levels enum
  private colors: Record<keyof typeof Levels, string> = {
    error: "bold red",
    warn: "bold yellow",
    info: "bold green",
    http: "bold magenta",
    debug: "bold cyan",
  };

  constructor() {
    winston.addColors(this.colors);
    this.logger = this.initLogger();
  }

  error(message: string): void {
    this.logger.error(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  info(message: string): void {
    this.logger.info(message);
  }

  http(message: string): void {
    this.logger.http(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  private consoleFormat() {
    return format.combine(
      timestamp(),
      colorize({ all: true }),
      printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
    );
  }

  private levelFilter(level: string) {
    return format((info, _opts) => {
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
