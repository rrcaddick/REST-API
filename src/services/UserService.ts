import { autoInjectable, inject, injectable } from "tsyringe";
import { IRepository } from "../repositories/IRepository";
import { User } from "../types/User";

@autoInjectable()
export class UserService {
  constructor(@inject("UserRepository") public repo?: IRepository<User>) {}

  async getUser(id: string) {}
}
