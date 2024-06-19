import { IReturnEntity } from "@entities/sql/interfaces/return.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { OrderEntity } from "@entities/sql/typeorm/order.entity";
import { ReturnItemEntity } from "./return-item.entity";

@Entity("returns")
export class ReturnEntity extends BaseEntity implements IReturnEntity {
  @Column({ name: "order_id" })
  public orderId: number;

  @Column({ name: "return_date", type: "datetime" })
  public returnDate: Date;

  @Column({ type: "enum", enum: ["Pending", "Approved", "Rejected"], default: "Pending" })
  public status: string;

  @Column({ type: "text" })
  public reason: string;

  @Column({ name: "refund_method", type: "enum", enum: ["Payment Card", "Customer Credit"] })
  public refundMethod: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  public total: number;

  @OneToOne(() => OrderEntity, (order) => order.id)
  @JoinColumn({
    name: "order_id",
    referencedColumnName: "id",
  })
  public order: OrderEntity;

  @OneToMany(() => ReturnItemEntity, (returnItem) => returnItem.returnId)
  public returnItems: ReturnItemEntity[];
}
