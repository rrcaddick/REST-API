import { container, Lifecycle } from "tsyringe";
import { LoggerService } from "@logger/logger.service";
import { ILogger } from "@logger/logger.interface";
import { IDbConnection, MongoDbConnection } from "@config/mongodb.config";
// import { IUserEntity } from "@root/infrastructure/entities/sql/interfaces/user.entity.interface";
import { MongooseUserRepository } from "@repositories/mongodb/typegoose";
import { UserEntity } from "@entities/sql/typeorm/user.entity";
import { UserService, IUserModel, UserModel } from "@user";
// import { IUserRepository } from "@repositories/mongodb/typegoose/user.repository.interface";
import { IDataSource } from "./db.config.interface";
import { MySqlDataSource } from "./database/mysql/mysql.config";
import { UserRepository } from "@repositories/sql/typeorm/user.repository";

// TODO: Create factories to dynamically return implentation based on env variables or config file
container.register<ILogger>("Logger", { useClass: LoggerService });
container.register<IDbConnection>("DbConnection", { useClass: MongoDbConnection });
container.register<IDataSource>("DataSource", { useClass: MySqlDataSource }, { lifecycle: Lifecycle.Singleton });

// User
container.register<IUserModel>("UserModel", { useClass: UserModel });

container.register<UserService>("UserService", { useClass: UserService });

container.register<MongooseUserRepository>("UserRepository", { useClass: MongooseUserRepository });

container.register("UserEntity", { useClass: UserEntity });
container.register("UserRepo", { useClass: UserRepository });
