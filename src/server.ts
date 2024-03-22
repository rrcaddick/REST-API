import "reflect-metadata";
import "./config/environmentVariables";
import "./controllers";
import { getEnv } from "./utils/global";
import { container } from "tsyringe";
import { App } from "./App";

// Start server
(async () => {
  const PORT = parseInt(getEnv("PORT") || "5000");

  const app = container.resolve(App);

  await app.start(PORT);
})();
