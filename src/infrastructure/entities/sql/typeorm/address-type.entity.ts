import { Entity, Column, OneToMany } from "typeorm";
import { UserAddressEntity } from "@root/infrastructure/entities/sql/typeorm/user-address.entity";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { IAddressTypeEntity } from "@entities/sql/interfaces/address-type.entity.interface";

@Entity("address_types")
export class AddressTypeEntity extends BaseEntity implements IAddressTypeEntity {
  @Column({ name: "address_type" })
  addressType: string;

  @OneToMany(() => UserAddressEntity, (userAddress) => userAddress.addressType)
  addresses: UserAddressEntity[];
}
