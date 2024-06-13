import { Entity, Column, OneToMany } from "typeorm";
import { UserAddressEntity } from "@entities/sql/typeorm/user.address.entity";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";

@Entity("address_types")
export class AddressTypeEntity extends BaseEntity {
  @Column({ name: "address_type" })
  addressType: string;

  @OneToMany(() => UserAddressEntity, (userAddress) => userAddress.addressType)
  addresses: UserAddressEntity[];
}
