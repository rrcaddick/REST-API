import { IAddressModel, IUserModel } from "./user.model.interface";
import { UserEntity } from "@root/infrastructure/entities/sql/typeorm/user.entity";

// TODO: Likely rename this to UserProfileModel in line with the data access patterns
export class UserModel implements IUserModel {
  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.fullName = `${userEntity.firstName} ${userEntity.lastName}`;
    this.email = userEntity.email;
    this.dateOfBirth = userEntity.dateOfBirth;

    this.addresses = userEntity.userAddressses.map(({ address, addressType }) => ({
      type: addressType.addressType,
      buildingCompanyName: address.buildingCompanyName,
      street: address.street,
      city: address.city,
      state: address.state,
      postCode: address.postCode,
    }));

    this.roles = userEntity.roles.map((role) => role.roleName);
  }

  public id: number;
  public fullName: string;
  public email: string;
  public dateOfBirth: Date;
  public addresses: IAddressModel[];
  public roles: string[];
}
