import "module-alias/register";
import "reflect-metadata";
import { config } from "dotenv";
config();
import "@config/di.config";
import "@controllers";
import { getEnv } from "@utils/env";
import { container } from "tsyringe";
import { App } from "@root/app";
import { UserRepository } from "@repositories/sql/typeorm/user.repository";

const startServer = async () => {
  const PORT = parseInt(getEnv("PORT") ?? "5000");

  const app = container.resolve(App);
  await app.start(PORT);

  const userRepo = container.resolve(UserRepository);
  const user = await userRepo.create({
    firstName: "Ray",
    lastName: "Caddick",
    email: "rrcaddick@gmail.com",
    password: "Whatever123",
    dateOfBirth: new Date("1990-03-01"),
    mobile: "+27763635909",
  });

  console.log(user);
};

// Start Server
startServer();
