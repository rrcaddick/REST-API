import { container, Lifecycle } from "tsyringe";
import { LoggerService } from "@logger/logger.service";
import { ILogger } from "@logger/logger.interface";
import { IDbConnection, MongoDbConnection } from "@config/mongodb.config";
import { IUserEntity } from "@root/infrastructure/entities/sql/interfaces/user.entity.interface";
import { MongooseUserRepository } from "@repositories/typegoose";
import { UserEntity } from "@root/infrastructure/entities/mongodb/typegoose";
import { UserService, IUserService, IUserModel, UserModel } from "@user";
import { IUserRepository } from "@root/infrastructure/repositories/typegoose/user.repository.interface";
import { IDataSource } from "./db.config.interface";
import { MySqlDataSource } from "./database/mysql/mysql.config";

// TODO: Create factories to dynamically return implentation based on env variables or config file
container.register<ILogger>("Logger", { useClass: LoggerService });
container.register<IDbConnection>("DbConnection", { useClass: MongoDbConnection });
container.register<IDataSource>("DataSource", { useClass: MySqlDataSource }, { lifecycle: Lifecycle.Singleton });

// User
container.register<IUserModel>("UserModel", { useClass: UserModel });

container.register<IUserService>("UserService", { useClass: UserService });

container.register<IUserRepository<IUserEntity>>("UserRepository", { useClass: MongooseUserRepository });

container.register("UserEntity", { useValue: UserEntity });
