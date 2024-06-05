import { DataSource } from "typeorm";
import { MongoClient } from "mongodb";

export interface IDataSource {
  connect(): Promise<DataSource | MongoClient>;
  getClient(): DataSource | MongoClient;
}
