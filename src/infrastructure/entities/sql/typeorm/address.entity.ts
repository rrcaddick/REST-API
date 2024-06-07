import { IAddressEntity } from "@entities/sql/interfaces/address.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { UserAddressEntity } from "./user.address.entity";

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

  @OneToMany(() => UserAddressEntity, (user) => user.address)
  users: UserAddressEntity[];
}
