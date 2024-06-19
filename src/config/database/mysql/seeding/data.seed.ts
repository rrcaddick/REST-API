import "module-alias/register";
import "reflect-metadata";
import { config } from "dotenv";
config();
import "@config/di.config";
import axios from "axios";
import { autoInjectable, inject } from "tsyringe";
import { UserRepository } from "@repositories/sql/typeorm/user.repository";
import { IDataSource } from "../../../db.config.interface";

@autoInjectable()
export class DataSeedService {
  private userDataUrl = "https://dummyjson.com/users?limit=5";
  private categoryDataUrl = "https://dummyjson.com/products/categories?limit=0";

  constructor(
    @inject("UserRepo") private userRepo?: UserRepository,
    @inject("DataSource") private dataSource?: IDataSource
  ) {}

  async connect() {
    await this.dataSource?.connect();
  }

  generateEmailDomain() {
    const domains = ["gmail", "yahoo", "outlook", "hotmail", "protonmail", "zoho", "icloud", "aol"];

    return domains[Math.floor(Math.random() * domains.length)];
  }

  extractUser(data: any) {
    const { id, firstName, lastName, email, password, birthDate: dateOfBirth, phone } = data;

    const mobile = `+27${phone.replace(/-/g, "").substring(4)}`.substring(0, 12);

    const gmail = email.replace("x.dummyjson", this.generateEmailDomain());

    return {
      id,
      firstName,
      lastName,
      email: gmail,
      password,
      dateOfBirth,
      mobile,
      credit: 0,
    };
  }

  extractAddresses(data: any) {
    const homeAddress = data?.address;

    const workAddress = data?.company?.address;

    return [homeAddress, workAddress];
  }

  extractCardData(data: any) {
    const { cardType, cardNumber, cardExpire, iban } = data?.bank;

    return {
      userId: data.id,
      cardType,
      lastFourDigits: cardNumber.slice(-4),
      expiryMonth: cardExpire.slice(0, 2),
      expiryYear: cardExpire.slice(-2),
      cardToken: iban,
    };
  }

  async seedRoleData() {
    const roles = ["ADMIN", "PRODUCT MANAGER", "FINANCE MANAGER", "CS AGENT", "CUSTOMER"];

    for (const role of roles) {
      // TODO:Write data to the database
    }
  }

  async seedUserData() {
    const response = await axios.get(this.userDataUrl);

    const users = [];

    for (const data of response.data.users) {
      users.push(this.extractUser(data));

      const addresses = this.extractAddresses(data);

      const cardData = this.extractCardData(data);
    }

    await this.userRepo?.insertMany(users);
  }

  async seedCategoryData() {
    const response = await axios.get(this.categoryDataUrl);

    for (const data of response.data) {
      const { name } = data;

      // TODO:Write data to the database
    }
  }

  async initSeedData() {
    await this.connect();
    await this.seedUserData();
  }
}

(async () => {
  const dataSeedService = new DataSeedService();
  await dataSeedService.initSeedData();
  process.exit(0);
})();
