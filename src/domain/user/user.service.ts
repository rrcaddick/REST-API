import { autoInjectable, inject } from "tsyringe";
import { IRepository } from "@repositories/repository.interface";
import { IUser } from "@user/user.interface";

@autoInjectable()
export class UserService {
  constructor(@inject("UserRepository") public repo?: IRepository<IUser>) {}

  async getUser(id: string) {}
}
