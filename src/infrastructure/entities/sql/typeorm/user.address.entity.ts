import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { IUserAddressEntity } from "@entities/sql//interfaces/user.address.entity.interface";
import { TimestampEntity } from "@entities/sql/typeorm/base.entity";
import { UserEntity } from "@entities/sql/typeorm/user.entity";
import { AddressEntity } from "@entities/sql/typeorm/address.entity";
import { AddressTypeEntity } from "./address-type.entity";

@Entity("user_addresses")
export class UserAddressEntity extends TimestampEntity implements IUserAddressEntity {
  @PrimaryColumn({ name: "user_id" })
  public userId: number;

  @PrimaryColumn({ name: "address_id" })
  public addressId: number;

  @PrimaryColumn({ name: "address_type_id" })
  public addressTypeId: number;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  public user: UserEntity;

  @ManyToOne(() => AddressEntity, (address) => address.users)
  @JoinColumn({
    name: "address_id",
    referencedColumnName: "id",
  })
  public address: AddressEntity;

  @ManyToOne(() => AddressTypeEntity, (addressType) => addressType.addresses)
  @JoinColumn({
    name: "address_type_id",
    referencedColumnName: "id",
  })
  public addressType: AddressTypeEntity;
}
