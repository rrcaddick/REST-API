import { inject, injectable } from "tsyringe";
import { UserRepository } from "@repositories/sql/typeorm/user.repository";
import { UserRoleRepository } from "@repositories/sql/typeorm/user-role.repository";
import { UserAddressRepository } from "@repositories/sql/typeorm/user-address.repository";
import { IUserModel } from "./user.model.interface";
import { UserModel } from "./user.model";

@injectable()
export class UserService {
  constructor(
    @inject("UserRepo") private userRepo: UserRepository,
    @inject("UserAddressRepo") private userAddressRepo: UserAddressRepository,
    @inject("UserRoleRepo") private userRoleRepo: UserRoleRepository
  ) {}

  // async getAllUsers(): Promise<IUserModel[]> {
  //   return this.userRepo.getAllUsers();
  // }

  async getUser(id: number): Promise<IUserModel> {
    const userEntity = await this.userRepo.findOneById(id);
    const userAddresses = await this.userAddressRepo.getUserAddresses(id);
    const roleEntities = await this.userRoleRepo.getUserRoles(id);

    if (!userEntity || !userAddresses || !roleEntities) {
      throw new Error(`No user found with id: ${id}`);
    }

    const addresses = userAddresses.map((userAddress) => ({
      type: userAddress.addressType.addressType,
      ...userAddress.address,
    }));

    const roles = roleEntities.map(({ role }) => role);

    return new UserModel(userEntity, addresses, roles);
  }
}
