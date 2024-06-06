import { ITimestampEntity } from "./base.entity.interface";

export interface IUserAddressEntity extends ITimestampEntity {
  userId: number;
  addressId: number;
}
