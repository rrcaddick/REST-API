import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { IReturnItemEntity } from "@entities/sql/interfaces/return-item.entity.interface";
import { TimestampEntity } from "@entities/sql/typeorm/base.entity";
import { OrderItemEntity } from "@entities/sql/typeorm/order-item.entity";
import { ReturnEntity } from "@entities/sql/typeorm/return.entity";

@Entity("return_items")
export class ReturnItemEntity extends TimestampEntity implements IReturnItemEntity {
  @PrimaryColumn({ name: "return_id" })
  returnId: number;

  @PrimaryColumn({ name: "order_item_id" })
  orderItemId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => ReturnEntity, (returnEntity) => returnEntity.id)
  @JoinColumn({
    name: "return_id",
    referencedColumnName: "id",
  })
  public return: ReturnEntity;

  @ManyToOne(() => OrderItemEntity, (orderItem) => orderItem.id)
  @JoinColumn({
    name: "order_item_id",
    referencedColumnName: "id",
  })
  public orderItem: OrderItemEntity;
}
