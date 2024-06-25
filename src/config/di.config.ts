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
import { RoleRepository } from "@repositories/sql/typeorm/role.repository";
import { RoleEntity } from "@entities/sql/typeorm/role.entity";
import { AddressTypeEntity } from "@entities/sql/typeorm/address-type.entity";
import { AddressTypeRepository } from "@repositories/sql/typeorm/address-type.repository";
import { ProductCategoryEntity } from "@entities/sql/typeorm/product-category.entity";
import { ProductCategoryRepository } from "@repositories/sql/typeorm/product-category.repository";
import { OrderStatusEntity } from "@entities/sql/typeorm/order-status.entity";
import { OrderStatusRepository } from "@repositories/sql/typeorm/order-status.repository";
import { AddressEntity } from "@entities/sql/typeorm/address.entity";
import { AddressRepository } from "@repositories/sql/typeorm/address.respository";
import { UserAddressEntity } from "@entities/sql/typeorm/user-address.entity";
import { PaymentCardEntity } from "@entities/sql/typeorm/payment-card.entity";
import { UserAddressRepository } from "@repositories/sql/typeorm/user-address.repository";
import { PaymentCardRepository } from "@repositories/sql/typeorm/payment-card.repository";
import { UserRoleEntity } from "@entities/sql/typeorm/user-role.entity";
import { UserRoleRepository } from "@repositories/sql/typeorm/user-role.repository";

// TODO: Create factories to dynamically return implentation based on env variables or config file
container.register<ILogger>("Logger", { useClass: LoggerService });
container.register<IDbConnection>("DbConnection", { useClass: MongoDbConnection });
container.register<IDataSource>("DataSource", { useClass: MySqlDataSource }, { lifecycle: Lifecycle.Singleton });

// User
container.register<IUserModel>("UserModel", { useClass: UserModel });

container.register<UserService>("UserService", { useClass: UserService });

container.register<MongooseUserRepository>("UserRepository", { useClass: MongooseUserRepository });

/////////////
// TYPEORM //
/////////////

// Entities
container.register("UserEntity", { useClass: UserEntity });
container.register("RoleEntity", { useClass: RoleEntity });
container.register("UserRoleEntity", { useClass: UserRoleEntity });
container.register("AddressTypeEntity", { useClass: AddressTypeEntity });
container.register("AddressEntity", { useClass: AddressEntity });
container.register("UserAddressEntity", { useClass: UserAddressEntity });
container.register("PaymentCardEntity", { useClass: PaymentCardEntity });
container.register("ProductCategoryEntity", { useClass: ProductCategoryEntity });
container.register("OrderStatusEntity", { useClass: OrderStatusEntity });

// Repositories
container.register("UserRepo", { useClass: UserRepository });
container.register("RoleRepo", { useClass: RoleRepository });
container.register("UserRoleRepo", { useClass: UserRoleRepository });
container.register("AddressTypeRepo", { useClass: AddressTypeRepository });
container.register("AddressRepo", { useClass: AddressRepository });
container.register("UserAddressRepo", { useClass: UserAddressRepository });
container.register("PaymentCardRepo", { useClass: PaymentCardRepository });
container.register("ProductCategoryRepo", { useClass: ProductCategoryRepository });
container.register("OrderStatusRepo", { useClass: OrderStatusRepository });
