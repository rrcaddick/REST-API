import "reflect-metadata";
import "./App";
import "./controllers";
import { getEnv } from "./utils/global";
import { App } from "./App";
import { config as addEnvVariables } from "dotenv";

// Add evn variables
addEnvVariables();

// Start server
(async () => {
  const PORT = parseInt(getEnv("PORT") || "5000");

  const app = new App();

  await app.start(PORT);
})();
