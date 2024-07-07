import { IAddressModel, ICreateAddress } from "@domain/address/address.model.interface";

interface IBaseUser {
  fullName: string;
  email: string;
  mobile: string;
  dateOfBirth: Date;
  credit?: number;
}

export interface IUserModel extends IBaseUser {
  id: number;
  addresses?: IAddressModel[];
  roles: string[];
}

export interface ICreateUser extends IBaseUser {
  password: string;
  addresses?: ICreateAddress[];
  roleIds: number[];
}
