import "reflect-metadata";
import "./app";
import "./controllers";
import { ExpressApp } from "./config/ExpressApp";
import { getEnv } from "./utils/global";

const PORT = getEnv("PORT");

const app = ExpressApp.getApp();

app.listen(PORT, () => {
  console.log(`Express app starterd on port ${PORT}`);
});
