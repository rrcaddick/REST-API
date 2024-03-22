import { Connection, connect, set, MongooseOptions, ConnectOptions } from "mongoose";
import { getEnv, isDevelopment } from "../utils/global";
import { singleton } from "tsyringe";

type ConnectionOptions = { mongooseOptions?: MongooseOptions; connectionOptions?: ConnectOptions };

// TODO: Decide how to make this interface fit all db types
interface IDbConnection {
  connect(options?: ConnectionOptions): Promise<void>;
  getConnection(): Connection;
}

@singleton()
export class MongoDbConnection implements IDbConnection {
  private connection: Connection;

  async connect(options?: ConnectionOptions): Promise<void> {
    if (!this.connection) {
      const mongoURI = getEnv("MONGO_URI");
      const { mongooseOptions = {}, connectionOptions = {} } = options ?? {};
      try {
        set("debug", isDevelopment());

        for (const [option, value] of Object.entries(mongooseOptions)) {
          set(option as keyof MongooseOptions, value);
        }

        if (!mongoURI) {
          throw new Error("No MongoDb URI specified. Please check environment variables for MONGO_URI");
        }

        const { connection } = await connect(mongoURI, connectionOptions);

        this.connection = connection;

        console.log(`MongoDb connected on ${connection.host}`);
      } catch (error) {
        console.error("MongoDB connection error:", error);
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
