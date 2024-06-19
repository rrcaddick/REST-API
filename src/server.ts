import "module-alias/register";
import "reflect-metadata";
import { config } from "dotenv";
config();
import "@config/di.config";
import "@controllers";
import { getEnv } from "@utils/env";
import { container } from "tsyringe";
import { App } from "@root/app";
import { DataSeedService } from "./config/database/mysql/seeding/data.seed";

const startServer = async () => {
  const PORT = parseInt(getEnv("PORT") ?? "5000");

  const app = container.resolve(App);
  await app.start(PORT);

  const seedService = new DataSeedService();

  await seedService.seedUserData();
};

// Start Server
startServer();
