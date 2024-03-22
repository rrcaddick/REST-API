import { container } from "tsyringe";
import { App } from "../App";
import { MongoDbConnection } from "../config/MongoDb";
import { WinstonLogger } from "../services/Logger";

container.register("App", { useClass: App });
container.register("DatabaseConnection", { useClass: MongoDbConnection });
container.register("Logger", { useClass: WinstonLogger });
