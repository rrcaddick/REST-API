import "reflect-metadata";
import { config } from "dotenv";
config();
import "@config/di.config";
import "@controllers";
import { getEnv } from "@utils/env";
import { container } from "tsyringe";
import { App } from "@root/app";

const startServer = async () => {
  const PORT = parseInt(getEnv("PORT") ?? "5000");

  const app = container.resolve(App);
  await app.start(PORT);
};

// Start Server
startServer();
