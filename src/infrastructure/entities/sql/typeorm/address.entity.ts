import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { IAddressEntity } from "@entities/sql/interfaces/address.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { UserAddressEntity } from "@entities/sql/typeorm/user.address.entity";
import { OrderEntity } from "./order.entity";
import { UserEntity } from "./user.entity";

@Entity("addresses")
export class AddressEntity extends BaseEntity implements IAddressEntity {
  @Column()
  street: string;

  @Column({ name: "building_complex" })
  buildingComplex: string;

  @Column()
  suburb: string;

  @Column()
  city: string;

  @Column()
  province: string;

  @Column({ name: "post_code" })
  postCode: number;

  @OneToMany(() => UserAddressEntity, (userAddress) => userAddress.user)
  public userAddressses: UserAddressEntity[];

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

  @OneToMany(() => OrderEntity, (order) => order.addressId)
  orders: OrderEntity[];
}
