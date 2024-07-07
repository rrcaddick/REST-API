import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { IAddressEntity } from "@entities/sql/interfaces/address.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { UserAddressEntity } from "@root/infrastructure/entities/sql/typeorm/user-address.entity";
import { OrderEntity } from "./order.entity";
import { UserEntity } from "./user.entity";
import { AddressTypeEntity } from "./address-type.entity";
import { ICreateAddress } from "@root/domain/address/address.model.interface";

@Entity("addresses")
export class AddressEntity extends BaseEntity implements IAddressEntity {
  constructor();
  constructor(createAddress?: ICreateAddress);
  constructor(arg1?: ICreateAddress | undefined) {
    super();
    // TODO: Validate and standardize address data. Use google address validator API or similar
    if (arg1) {
      this.street = arg1.street;
      this.buildingCompanyName = arg1.buildingCompanyName;
      this.city = arg1.city;
      this.state = arg1.state;
      this.postCode = arg1.postCode;
    }
  }
  @Column({ name: "address_hash" })
  public addressHash: string;

  @Column()
  public street: string;

  @Column({ name: "building_company_name", nullable: true })
  public buildingCompanyName?: string;

  @Column()
  public city: string;

  @Column()
  public state: string;

  @Column({ name: "post_code" })
  public postCode: number;

  @OneToMany(() => UserAddressEntity, (userAddress) => userAddress.user)
  public userAddressses: UserAddressEntity[];

  @OneToMany(() => OrderEntity, (order) => order.addressId)
  public orders: OrderEntity[];

  @ManyToMany(() => UserEntity, (user) => user.addresses)
  @JoinTable({
    name: "user_addresses",
    joinColumn: {
      name: "address_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id",
    },
  })
  public users: UserEntity[];

  @OneToMany(() => AddressTypeEntity, (addressType) => addressType.addresses)
  @JoinTable({
    name: "user_addresses",
    joinColumn: { name: "address_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "address_type_id", referencedColumnName: "id" },
  })
  public addressTypes: AddressTypeEntity[];
}
