import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { OrderEntity } from "@entities/sql/typeorm/order.entity";
import { ICourrierEntity } from "@entities/sql/interfaces/courrier.entity.interface";

@Entity("courriers")
export class CourrierEntity extends BaseEntity implements ICourrierEntity {
  @Column({ name: "name" })
  public name: string;

  @Column({ name: "contact_number" })
  public contactNumber: string;

  @Column({ name: "shipping_cost" })
  public shippingCost: number;

  @OneToMany(() => OrderEntity, (order) => order.courrierId)
  public orders: OrderEntity[];
}
