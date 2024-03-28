import { container } from "tsyringe";
import { LoggerService } from "@logger/logger.service";
import { ILogger } from "@logger/logger.interface";
import { IDbConnection, MongoDbConnection } from "@config/mongodb.config";
import { IUser } from "@user/user.interface";
import { IRepository, MongooseUserRepository } from "@infrastructure/repositories";

container.register<ILogger>("Logger", { useClass: LoggerService });
container.register<IDbConnection>("DbConnection", { useClass: MongoDbConnection });
container.register<IRepository<IUser>>("UserRepository", { useClass: MongooseUserRepository });
