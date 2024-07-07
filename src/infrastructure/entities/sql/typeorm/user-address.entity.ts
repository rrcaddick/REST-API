import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { IUserAddressEntity } from "@root/infrastructure/entities/sql/interfaces/user-address.entity.interface";
import { TimestampEntity } from "@entities/sql/typeorm/base.entity";
import { UserEntity } from "@entities/sql/typeorm/user.entity";
import { AddressEntity } from "@entities/sql/typeorm/address.entity";
import { AddressTypeEntity } from "./address-type.entity";

@Entity("user_addresses")
export class UserAddressEntity extends TimestampEntity implements IUserAddressEntity {
  constructor();
  constructor(userId: number, addressId: number, addressTypeId: number);
  constructor(address?: AddressEntity, addressType?: AddressTypeEntity);
  constructor(arg1?: number | AddressEntity, arg2?: number | AddressTypeEntity, arg3?: number) {
    super();

    if (arg1 && typeof arg1 === "number") this.userId = arg1;
    if (arg2 && typeof arg2 === "number") this.addressId = arg2;
    if (arg3 && typeof arg3 === "number") this.addressTypeId = arg3;

    if (arg1 instanceof AddressEntity) this.address = arg1;
    if (arg2 instanceof AddressTypeEntity) this.addressType = arg2;
  }

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

  @ManyToOne(() => AddressEntity, (address) => address.users, { cascade: true })
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
