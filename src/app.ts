import cookieParser from "cookie-parser";
import { config as envConfig } from "dotenv";
import { urlencoded, json } from "express";
import { ExpressApp } from "./config/ExpressApp";

// Configure environment variables
envConfig();

// Create express app
const app = ExpressApp.getApp();

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
