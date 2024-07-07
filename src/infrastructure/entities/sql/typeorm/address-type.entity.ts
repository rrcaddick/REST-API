import { Entity, Column, OneToMany } from "typeorm";
import { UserAddressEntity } from "@root/infrastructure/entities/sql/typeorm/user-address.entity";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { IAddressTypeEntity } from "@entities/sql/interfaces/address-type.entity.interface";

@Entity("address_types")
export class AddressTypeEntity extends BaseEntity implements IAddressTypeEntity {
  constructor();
  constructor(id?: number);
  constructor(addressType?: string);
  constructor(id?: number, addressType?: string);
  constructor(arg1?: number | string, arg2?: string) {
    super();
    if (typeof arg1 === "number") this.id = arg1;
    if (typeof arg1 === "string") this.addressType = arg1;

    switch (typeof arg1) {
      case "number":
        this.id = arg1;
        break;
      case "string":
        this.addressType = arg1;
        break;
    }

    if (typeof arg1 === "number" && arg2) {
      this.id = arg1;
      this.addressType = arg2;
    }
  }

  @Column({ name: "address_type" })
  addressType: string;

  @OneToMany(() => UserAddressEntity, (userAddress) => userAddress.addressType)
  addresses: UserAddressEntity[];
}
