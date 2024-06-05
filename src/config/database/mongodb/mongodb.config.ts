import { ILogger } from "@logger/logger.interface";
import { getEnv } from "@root/utils/env";
import { singleton, inject, injectable } from "tsyringe";
import { MongoClient, ServerApiVersion } from "mongodb";
import { IDataSource } from "@root/config/db.config.interface";

@singleton()
@injectable()
export class MongoDbSource implements IDataSource {
  private uri: string = getEnv("MONGODB_URI") ?? "";
  private client: MongoClient;

  constructor(@inject("Logger") private logger: ILogger) {}

  public async connect(uri?: string): Promise<MongoClient> {
    this.client = new MongoClient(uri ?? this.uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    try {
      await this.client.connect();

      // Send a ping to confirm a successful connection
      await this.client.db("Admin").command({ ping: 1 });
      this.logger.info("You successfully connected to MongoDB!");
      return this.client;
    } catch (error) {
      this.logger.error("Failed to connect to MongoDB:", error);
      throw error;
    }
  }

  public getClient(): MongoClient {
    if (!this.client) {
      this.logger.debug("No database connection. Did you forget to run connect?");
      throw Error("No database connection. Did you forget to run connect?");
    }
    return this.client;
  }
}
