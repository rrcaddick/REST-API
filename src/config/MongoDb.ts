import { Connection, connect, set, MongooseOptions, ConnectOptions } from "mongoose";
import { getEnv, isDevelopment } from "../utils/env";
import { singleton, inject, injectable } from "tsyringe";
import { ILogger } from "../services/loggers/ILogger";

type ConnectionOptions = { mongooseOptions?: MongooseOptions; connectionOptions?: ConnectOptions };

// TODO: Refactor - Remove getConnection methods and expose commonly used connection methods instead
export interface IDbConnection {
  connect(options?: ConnectionOptions): Promise<void>;
  getConnection(): Connection;
}

@singleton()
@injectable()
export class MongoDbConnection implements IDbConnection {
  private connection: Connection;

  constructor(@inject("Logger") private logger: ILogger) {}

  async connect(options?: ConnectionOptions): Promise<void> {
    if (!this.connection) {
      const mongoURI = getEnv("MONGO_URI");
      const { mongooseOptions = {}, connectionOptions = {} } = options ?? {};

      if (!mongoURI) {
        throw new Error("No MongoDb URI specified. Please check environment variables for MONGO_URI");
      }

      try {
        set("debug", isDevelopment());

        for (const [option, value] of Object.entries(mongooseOptions)) {
          set(option as keyof MongooseOptions, value);
        }

        const { connection } = await connect(mongoURI, connectionOptions);

        this.connection = connection;

        this.logger.info(`MongoDb connected on ${connection.host}`);
      } catch (error) {
        this.logger.error("MongoDB connection error:", error);
        throw error;
      }
    }
  }

  getConnection(): Connection {
    if (!this.connection) {
      throw new Error("No mongodb database connected. Please run connect() first");
    }

    return this.connection;
  }
}
