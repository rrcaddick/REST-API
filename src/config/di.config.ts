import { container, Lifecycle } from "tsyringe";
import { LoggerService } from "@logger/logger.service";
import { ILogger } from "@logger/logger.interface";
import { IDbConnection, MongoDbConnection } from "@config/mongodb.config";
// import { IUserEntity } from "@entities/sql/interfaces/user.entity.interface";
// import { MongooseUserRepository } from "@repositories/mongodb/typegoose";
// import { IUserRepository } from "@repositories/mongodb/typegoose/user.repository.interface";
import { IDataSource } from "./db.config.interface";
import { MySqlDataSource } from "./database/mysql/mysql.config";
import { UserEntity } from "@entities/sql/typeorm/user.entity";
import { UserRepository } from "@repositories/sql/typeorm/user.repository";
import { RoleEntity } from "@entities/sql/typeorm/role.entity";
import { RoleRepository } from "@repositories/sql/typeorm/role.repository";
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
import { ProductEntity } from "@entities/sql/typeorm/product.entity";
import { ReviewEntity } from "@entities/sql/typeorm/review.entity";
import { ProductPriceHistoryEntity } from "@entities/sql/typeorm/product-price-history.entity";
import { ProductImageEntity } from "@entities/sql/typeorm/product-image.entity";
import { InventoryEntity } from "@entities/sql/typeorm/inventory.entity";
import { ProductRepository } from "@repositories/sql/typeorm/product.repository";
import { ReviewRepository } from "@repositories/sql/typeorm/review.repository";
import { ProductPriceHistoryRepository } from "@repositories/sql/typeorm/product-price-history.repository";
import { ProductImageRepository } from "@repositories/sql/typeorm/product-image.repository";
import { InventoryRepository } from "@repositories/sql/typeorm/inventory.repository";
import { CourrierEntity } from "@entities/sql/typeorm/courrier.entity";
import { CourrierRepository } from "@repositories/sql/typeorm/courrier.repository";
import { PromotionEntity } from "@entities/sql/typeorm/promotion.entity";
import { PromotionRepository } from "@repositories/sql/typeorm/promotions.repository";
import { ShoppingCartEntity } from "@entities/sql/typeorm/shopping-cart.entity";
import { ShoppingCartRepository } from "@repositories/sql/typeorm/shopping-cart.repository";
import { WishlistEntity } from "@entities/sql/typeorm/wishlist.entity";
import { WishlistItemEntity } from "@entities/sql/typeorm/wishlist-item.entity";
import { WishlistRepository } from "@repositories/sql/typeorm/wishlist.repository";
import { WishlistItemRepository } from "@repositories/sql/typeorm/wishlist-item.repository";
import { OrderEntity } from "@entities/sql/typeorm/order.entity";
import { OrderItemEntity } from "@entities/sql/typeorm/order-item.entity";
import { ReturnEntity } from "@entities/sql/typeorm/return.entity";
import { ReturnItemEntity } from "@entities/sql/typeorm/return-item.entity";
import { RefundEntity } from "@entities/sql/typeorm/refund.entity";
import { SaleEntity } from "@entities/sql/typeorm/sale.entity";
import { InvoiceEntity } from "@entities/sql/typeorm/invoice.entity";
import { OrderRepository } from "@repositories/sql/typeorm/order.repository";
import { OrderItemRepository } from "@repositories/sql/typeorm/order-item.repository";
import { ReturnRepository } from "@repositories/sql/typeorm/return.repository";
import { ReturnItemRepository } from "@repositories/sql/typeorm/return-item.repository";
import { RefundRepository } from "@repositories/sql/typeorm/refund.repository";
import { SaleRepository } from "@repositories/sql/typeorm/sale.repository";
import { InvoiceRepository } from "@repositories/sql/typeorm/invoice.repository";
import { UserService } from "@domain/user/user.service";

// TODO: Create factories to dynamically return implentation based on env variables or config file
container.register<ILogger>("Logger", { useClass: LoggerService });
container.register<IDbConnection>("DbConnection", { useClass: MongoDbConnection });
container.register<IDataSource>("DataSource", { useClass: MySqlDataSource }, { lifecycle: Lifecycle.Singleton });

// User
// container.register<MongooseUserRepository>("UserRepository", { useClass: MongooseUserRepository });

//////////////////////////////////////////////////////////////////////////////
//                               TYPEORM                                    //
//////////////////////////////////////////////////////////////////////////////

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
container.register("ProductEntity", { useClass: ProductEntity });
container.register("ReviewEntity", { useClass: ReviewEntity });
container.register("ProductPriceHistoryEntity", { useClass: ProductPriceHistoryEntity });
container.register("ProductImageEntity", { useClass: ProductImageEntity });
container.register("InventoryEntity", { useClass: InventoryEntity });
container.register("CourrierEntity", { useClass: CourrierEntity });
container.register("PromotionEntity", { useClass: PromotionEntity });
container.register("ShoppingCartEntity", { useClass: ShoppingCartEntity });
container.register("WishlistEntity", { useClass: WishlistEntity });
container.register("WishlistItemEntity", { useClass: WishlistItemEntity });
container.register("OrderEntity", { useClass: OrderEntity });
container.register("OrderItemEntity", { useClass: OrderItemEntity });
container.register("ReturnEntity", { useClass: ReturnEntity });
container.register("ReturnItemEntity", { useClass: ReturnItemEntity });
container.register("RefundEntity", { useClass: RefundEntity });
container.register("SaleEntity", { useClass: SaleEntity });
container.register("InvoiceEntity", { useClass: InvoiceEntity });

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
container.register("ProductRepo", { useClass: ProductRepository });
container.register("ReviewRepo", { useClass: ReviewRepository });
container.register("ProductPriceHistoryRepo", { useClass: ProductPriceHistoryRepository });
container.register("ProductImageRepo", { useClass: ProductImageRepository });
container.register("InventoryRepo", { useClass: InventoryRepository });
container.register("CourrierRepo", { useClass: CourrierRepository });
container.register("PromotionRepo", { useClass: PromotionRepository });
container.register("ShoppingCartRepo", { useClass: ShoppingCartRepository });
container.register("WishlistRepo", { useClass: WishlistRepository });
container.register("WishlistItemRepo", { useClass: WishlistItemRepository });
container.register("OrderRepo", { useClass: OrderRepository });
container.register("OrderItemRepo", { useClass: OrderItemRepository });
container.register("ReturnRepo", { useClass: ReturnRepository });
container.register("ReturnItemRepo", { useClass: ReturnItemRepository });
container.register("RefundRepo", { useClass: RefundRepository });
container.register("SaleRepo", { useClass: SaleRepository });
container.register("InvoiceRepo", { useClass: InvoiceRepository });

// Service
container.register("UserService", { useClass: UserService });
