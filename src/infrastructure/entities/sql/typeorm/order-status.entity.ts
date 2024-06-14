import { Entity, Column, OneToMany } from "typeorm";
import { OrderEntity } from "@entities/sql/typeorm/order.entity";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { IOrderStatusEntity } from "@entities/sql/interfaces/order-status.entity.interface";

@Entity("order_statuses")
export class OrderStatusEntity extends BaseEntity implements IOrderStatusEntity {
  @Column()
  status: string;

  @Column()
  description: string;

  @OneToMany(() => OrderEntity, (order) => order.orderStatusId)
  orders: OrderEntity[];
}
