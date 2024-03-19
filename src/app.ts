import cookieParser from "cookie-parser";
import { config as addEnvVariables } from "dotenv";
import { urlencoded, json } from "express";
import { ExpressApp } from "./config/ExpressApp";
import { MongoDbConnection } from "./config/MongoDb";

export const initApp = async () => {
  // Configure environment variables
  addEnvVariables();

  // Connect MongoDb
  await MongoDbConnection.connect();

  // Create express app
  const app = ExpressApp.getApp();
  console.log("Innitialized app");

  // Body Parser
  app.use(urlencoded({ extended: true }));

  // JSON Parser
  app.use(json());

  // Cookie Parser
  app.use(cookieParser());

  // Add express routes
  app.use(ExpressApp.getRouter());

  // TODO: Add error handler
  // app.use();

  console.log("Added middleware");
};
