import { inject, injectable } from "tsyringe";
import { UserRepository } from "@repositories/sql/typeorm/user.repository";
import { ICreateUser, IUserModel } from "@domain/user/user.model.interface";
import { UserModel } from "@domain/user/user.model";
import { UserEntity } from "@entities/sql/typeorm/user.entity";
import { RoleEntity } from "@root/infrastructure/entities/sql/typeorm/role.entity";
import { AddressEntity } from "@root/infrastructure/entities/sql/typeorm/address.entity";
import { UserAddressEntity } from "@root/infrastructure/entities/sql/typeorm/user-address.entity";
import { AddressTypeEntity } from "@root/infrastructure/entities/sql/typeorm/address-type.entity";

@injectable()
export class UserService {
  constructor(@inject("UserRepo") private userRepo: UserRepository) {}

  async getUsers(): Promise<IUserModel[]> {
    const users = await this.userRepo.findWithRelations([
      "roles",
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
      "userAddressses.address",
      "userAddressses.addressType",
    ]);

    if (!user) {
      throw new Error(`No user found with id: ${id}`);
    }

    return new UserModel(user);
  }

  async createUser(userModel: ICreateUser): Promise<IUserModel> {
    const user = await this.userRepo.createUser(new UserEntity(userModel));

    if (!user) {
      throw new Error(`Failed to create user`);
    }

    return new UserModel(user);
  }
}
