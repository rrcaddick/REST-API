import { inject, injectable } from "tsyringe";
import { UserRepository } from "@repositories/sql/typeorm/user.repository";
import { IUserModel } from "./user.model.interface";
import { UserModel } from "./user.model";

@injectable()
export class UserService {
  constructor(@inject("UserRepo") private userRepo: UserRepository) {}

  async getUsers(): Promise<IUserModel[]> {
    const users = await this.userRepo.findWithRelations([
      "roles",
      "userAddressses",
      "userAddressses.address",
      "userAddressses.addressType",
    ]);

    if (!users || users.length === 0) {
      throw new Error(`No users found`);
    }

    return users.map((user) => new UserModel(user));
  }

  async getUser(id: number): Promise<IUserModel> {
    const user = await this.userRepo.findOneWithRelations(id, [
      "roles",
      "userAddressses",
      "userAddressses.address",
      "userAddressses.addressType",
    ]);

    if (!user) {
      throw new Error(`No user found with id: ${id}`);
    }

    return new UserModel(user);
  }
}
