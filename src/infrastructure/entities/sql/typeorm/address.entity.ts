import { IAddressEntity } from "@entities/sql/interfaces/address.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { Column } from "typeorm";

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

  @Column({ name: "post_code", length: 4 })
  postCode: number;
}
