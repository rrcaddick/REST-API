import { container } from "tsyringe";
import { WinstonLogger } from "../services/loggers/Logger";
import { ILogger } from "../services/loggers/ILogger";
import { IDbConnection, MongoDbConnection } from "./MongoDb";
import { User } from "../types/User";
import { IRepository } from "../repositories/IRepository";
import { MongooseUserRepository } from "../repositories/UserRepository";

container.register<ILogger>("Logger", { useClass: WinstonLogger });
container.register<IDbConnection>("DbConnection", { useClass: MongoDbConnection });
container.register<IRepository<User>>("UserRepository", { useClass: MongooseUserRepository });
