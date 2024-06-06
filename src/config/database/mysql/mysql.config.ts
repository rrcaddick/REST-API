import { join } from "path";
import { DataSource } from "typeorm";
import { ILogger } from "@root/infrastructure/logger";
import { inject, injectable } from "tsyringe";
import { IDataSource } from "@root/config/db.config.interface";
import { getEnv } from "@root/utils/env";
import { LoggerService } from "@root/infrastructure/logger";
import { UserEntity } from "@entities/sql/typeorm/user.entity";
import { RoleEntity } from "@entities/sql/typeorm/role.entity";
import { UserRoleEntity } from "@entities/sql/typeorm/user.roles.entity";

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
      entities: [UserEntity, RoleEntity, UserRoleEntity],
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
