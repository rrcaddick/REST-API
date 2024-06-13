import { join } from "path";
import { DataSource } from "typeorm";
import { NamingStrategy } from "@config/database/mysql/naming-strategy.config";
import { ILogger } from "@infrastructure/logger";
import { inject, injectable } from "tsyringe";
import { IDataSource } from "@config/db.config.interface";
import { getEnv } from "@utils/env";
import { LoggerService } from "@infrastructure/logger";
import { UserEntity } from "@entities/sql/typeorm/user.entity";
import { RoleEntity } from "@entities/sql/typeorm/role.entity";
import { UserRoleEntity } from "@entities/sql/typeorm/user.roles.entity";
import { AddressEntity } from "@entities/sql/typeorm/address.entity";
import { AddressTypeEntity } from "@entities/sql/typeorm/address-type.entity";
import { UserAddressEntity } from "@entities/sql/typeorm/user.address.entity";
import { ProductEntity } from "@entities/sql/typeorm/product.entity";
import { ProductCategoryEntity } from "@entities/sql/typeorm/product-category.entity";
import { ProductVariantEntity } from "@entities/sql/typeorm/product-variant.entity";
import { InventoryEntity } from "@entities/sql/typeorm/inventory.entity";
import { ProductPriceHistoryEntity } from "@entities/sql/typeorm/product-price-history.entity";
import { PromotionEntity } from "@entities/sql/typeorm/promotion.entity";
import { ProductImageEntity } from "@entities/sql/typeorm/product-image.entity";
import { WishlistEntity } from "@entities/sql/typeorm/wishlist.entity";
import { WishlistItemEntity } from "@entities/sql/typeorm/wishlist-item.entity";

@injectable()
export class MySqlDataSource implements IDataSource {
  private client: DataSource;

  constructor(@inject("Logger") private logger: ILogger) {
    this.client = new DataSource({
      type: "mysql",
      host: "localhost",
      port: parseInt(getEnv("MYSQL_PORT") ?? "3306"),
      username: "root",
      password: "Whatever123",
      database: "raytech_store",
      logging: true,
      namingStrategy: new NamingStrategy(),
      entities: [
        UserEntity,
        RoleEntity,
        UserRoleEntity,
        AddressEntity,
        AddressTypeEntity,
        UserAddressEntity,
        ProductEntity,
        ProductCategoryEntity,
        ProductVariantEntity,
        InventoryEntity,
        ProductPriceHistoryEntity,
        PromotionEntity,
        ProductImageEntity,
        WishlistEntity,
        WishlistItemEntity,
      ],
      migrations: [join(__dirname, "migrations", "*{.ts,.js}")],
    });
  }

  public async connect(): Promise<DataSource> {
    try {
      await this.client.initialize();
      this.logger.info("You successfully connected to MySql!");
      return this.client;
    } catch (error) {
      this.logger.error("Failed to connect to MySql:", error);
      throw error;
    }
  }

  public getClient(): DataSource {
    if (!this.client) {
      this.logger.debug("No database connection. Did you forget to run connect?");
      throw Error("No database connection. Did you forget to run connect?");
    }
    return this.client;
  }
}

const migratiionSource = new MySqlDataSource(new LoggerService());

export default migratiionSource.getClient();
