import { IAddressEntity } from "@root/infrastructure/entities/sql/interfaces/address.entity.interface";
import { IRoleEntity } from "@root/infrastructure/entities/sql/interfaces/role.entity.interface";
import { IUserEntity } from "@root/infrastructure/entities/sql/interfaces/user.entity.interface";
import { IAddressModel, IUserModel } from "./user.model.interface";
import { UserAddressEntity } from "@root/infrastructure/entities/sql/typeorm/user-address.entity";

export class UserModel implements IUserModel {
  constructor(userEntity: IUserEntity, addresses: IAddressModel[], roleEntities: IRoleEntity[]) {
    this.id = userEntity.id;
    this.fullName = `${userEntity.firstName} ${userEntity.lastName}`;
    this.email = userEntity.email;
    this.dateOfBirth = userEntity.dateOfBirth;
    this.addresses = addresses;
    this.roles = roleEntities.map((role) => role.roleName);
  }

  public id: number;
  public fullName: string;
  public email: string;
  public dateOfBirth: Date;
  public addresses: IAddressModel[];
  public roles: string[];
}
