import "reflect-metadata";
import "./config/environmentVariables";
import "./services/Logger";
import "./App";
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
