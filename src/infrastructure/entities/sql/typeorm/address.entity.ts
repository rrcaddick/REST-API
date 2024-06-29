import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { IAddressEntity } from "@entities/sql/interfaces/address.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { UserAddressEntity } from "@root/infrastructure/entities/sql/typeorm/user-address.entity";
import { OrderEntity } from "./order.entity";
import { UserEntity } from "./user.entity";
import { AddressTypeEntity } from "./address-type.entity";

@Entity("addresses")
export class AddressEntity extends BaseEntity implements IAddressEntity {
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

  @ManyToMany(() => AddressTypeEntity, (addressType) => addressType.addresses)
  @JoinTable({
    name: "user_addresses",
    joinColumn: { name: "address_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "address_type_id", referencedColumnName: "id" },
  })
  public addressTypes: AddressTypeEntity[];
}
