import "reflect-metadata";
import "@config/di.config";
import { container, inject, autoInjectable } from "tsyringe";
import { LoggerService, ILogger } from "@root/infrastructure/logger/";
import { IDbConnection, MongoDbConnection } from "../mongodb.config";
import { IRepository, MongooseUserRepository } from "@root/infrastructure/repositories";
import { IUser } from "@root/domain/user/user.interface";

@autoInjectable()
class TestClass {
  constructor(
    @inject("Logger") public logger?: ILogger,
    @inject("DbConnection") public connection?: IDbConnection,
    @inject("UserRepository") public mongooseUserRepo?: IRepository<IUser>
  ) {}

  getDependencies() {
    return {
      logger: this.logger,
      connection: this.connection,
      mongooseUserRepo: this.mongooseUserRepo,
    };
  }
}

describe("di.config", () => {
  describe("resolve", () => {
    it("should register LoggerService correctly", () => {
      const logger = container.resolve<ILogger>("Logger");
      expect(logger).toBeInstanceOf(LoggerService);
    });

    it("should register MongoDbConnection correctly", () => {
      const connection = container.resolve<IDbConnection>("DbConnection");
      expect(connection).toBeInstanceOf(MongoDbConnection);
    });

    it("should register MongooseUserRepository correctly", () => {
      const mongooseUserRepo = container.resolve<IRepository<IUser>>("UserRepository");
      expect(mongooseUserRepo).toBeInstanceOf(MongooseUserRepository);
    });

    it("should inject dependencies correctly", () => {
      // Test container.resolve
      const testClass = container.resolve(TestClass);
      const { logger, connection, mongooseUserRepo } = testClass.getDependencies();

      expect(logger).toBeInstanceOf(LoggerService);
      expect(connection).toBeInstanceOf(MongoDbConnection);
      expect(mongooseUserRepo).toBeInstanceOf(MongooseUserRepository);
    });
  });
  describe("autoInject", () => {
    it("should auto inject dependencies correctly", () => {
      // Test autoInjectable
      const testClass = new TestClass();

      const { logger, connection, mongooseUserRepo } = testClass.getDependencies();

      expect(logger).toBeInstanceOf(LoggerService);
      expect(connection).toBeInstanceOf(MongoDbConnection);
      expect(mongooseUserRepo).toBeInstanceOf(MongooseUserRepository);
    });
  });
});
