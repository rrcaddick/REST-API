import { Connection, connect, set, MongooseOptions, ConnectOptions } from "mongoose";
import { getEnv, isDevelopment } from "../utils/global";

type ConnectionOptions = { mongooseOptions?: MongooseOptions; connectionOptions?: ConnectOptions };

export class MongoDbConnection {
  private static connection: Connection;

  static async connect(options?: ConnectionOptions) {
    if (!MongoDbConnection.connection) {
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

        MongoDbConnection.connection = connection;

        console.log(`MongoDb connected on ${connection.host}`);
      } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
      }
    }
  }

  static async getConnection() {
    if (!MongoDbConnection.connection) {
      throw new Error("No mongodb database connected. Please run connect() first");
    }

    return MongoDbConnection.connection;
  }
}
