import { container } from "tsyringe";
import { WinstonLogger } from "../services/loggers/Logger";
import { ILogger } from "../services/loggers/ILogger";
import { IDbConnection, MongoDbConnection } from "./MongoDb";

container.register<ILogger>("Logger", { useClass: WinstonLogger });
container.register<IDbConnection>("DbConnection", { useClass: MongoDbConnection });
