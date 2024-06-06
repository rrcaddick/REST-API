import "module-alias/register";
import "reflect-metadata";
import { config } from "dotenv";
config();
import "@config/di.config";
import "@controllers";
import { getEnv } from "@utils/env";
import { container } from "tsyringe";
import { App } from "@root/app";
import { RoleEntity } from "./infrastructure/entities/sql/typeorm/role.entity";
import dataSource from "./config/database/mysql/mysql.config";

const startServer = async () => {
  const PORT = parseInt(getEnv("PORT") ?? "5000");

  const app = container.resolve(App);

  await app.start(PORT);

  const role = new RoleEntity();
  role.roleName = "ADMIN";
  dataSource.manager.save(role);
  console.log("Her");
};

// Start Server
startServer();
