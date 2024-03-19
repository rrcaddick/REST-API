import "reflect-metadata";
import "./app";
import "./controllers";
import { ExpressApp } from "./config/ExpressApp";
import { getEnv } from "./utils/global";
import { initApp } from "./app";

(async () => {
  await initApp();

  const PORT = getEnv("PORT");

  const app = ExpressApp.getApp();

  app.listen(PORT, () => {
    console.log(`Started app on port ${PORT}`);
  });
})();
