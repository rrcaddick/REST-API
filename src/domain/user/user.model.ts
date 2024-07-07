import { IAddressModel } from "@domain/address/address.model.interface";
import { IUserModel } from "@domain/user/user.model.interface";
import { UserEntity } from "@entities/sql/typeorm/user.entity";

// TODO: Likely rename this to UserProfileModel in line with the data access patterns
export class UserModel implements IUserModel {
  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.fullName = `${userEntity.firstName} ${userEntity.lastName}`;
    this.email = userEntity.email;
    this.mobile = userEntity.mobile;
    this.dateOfBirth = userEntity.dateOfBirth;
    this.credit = userEntity.credit;

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
  public mobile: string;
  public dateOfBirth: Date;
  public credit?: number;
  public addresses?: IAddressModel[];
  public roles: string[];
}
