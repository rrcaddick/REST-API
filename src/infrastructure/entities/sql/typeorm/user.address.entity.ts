import { JoinColumn, PrimaryColumn } from "typeorm";
import { IUserAddressEntity } from "../interfaces/user.address.entity.interface";
import { TimestampEntity } from "./base.entity";

export class UserAddressEntity extends TimestampEntity implements IUserAddressEntity {
  @PrimaryColumn()
  @JoinColumn({ name: "user_id" })
  userId: number;

  @PrimaryColumn()
  addressId: number;
}
