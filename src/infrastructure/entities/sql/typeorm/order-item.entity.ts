import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { IOrderItemEntity } from "@entities/sql/interfaces/order-item.entity.interface";
import { OrderEntity } from "@entities/sql/typeorm/order.entity";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { ProductEntity } from "@entities/sql/typeorm/product.entity";

@Entity("order_items")
export class OrderItemEntity extends BaseEntity implements IOrderItemEntity {
  @PrimaryColumn({ name: "order_id" })
  orderId: number;

  @PrimaryColumn({ name: "product_id" })
  productId: number;

  @Column({ name: "price", type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => OrderEntity, (order) => order.id)
  @JoinColumn({
    name: "order_id",
    referencedColumnName: "id",
  })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  @JoinColumn({
    name: "product_id",
    referencedColumnName: "id",
  })
  product: ProductEntity;
}
