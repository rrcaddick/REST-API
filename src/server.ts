import "reflect-metadata";
import "./config/environmentVariables";
import "./services/Logger";
import "./App";
import "./controllers";
import { getEnv } from "./utils/global";
import { App } from "./App";

// Start server
(async () => {
  const PORT = parseInt(getEnv("PORT") || "5000");

  const app = new App();

  await app.start(PORT);
})();

[
  ["0", "error"],
  ["1", "warn"],
  ["2", "info"],
  ["3", "http"],
  ["4", "debug"],
  ["error", 0],
  ["warn", 1],
  ["info", 2],
  ["http", 3],
  ["debug", 4],
];
