import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { IOrderEntity } from "@entities/sql/interfaces/order.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { AddressEntity } from "@entities/sql/typeorm/address.entity";
import { CourrierEntity } from "@entities/sql/typeorm/courrier.entity";
import { UserEntity } from "@entities/sql/typeorm/user.entity";
import { PaymentCardEntity } from "@entities/sql/typeorm/payment-card.entity";
import { OrderStatusEntity } from "@entities/sql/typeorm/order-status.entity";
import { InvoiceEntity } from "@entities/sql/typeorm/invoice.entity";
import { OrderItemEntity } from "@entities/sql/typeorm/order-item.entity";
import { ReturnEntity } from "@entities/sql/typeorm/return.entity";

@Entity("orders")
export class OrderEntity extends BaseEntity implements IOrderEntity {
  @Column({ name: "order_date", type: "date" })
  orderDate: Date;

  @Column({ name: "shipped_date", type: "date" })
  shippedDate: Date;

  @Column({ name: "total_due", type: "decimal", precision: 10, scale: 2 })
  totalDue: number;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.orderId)
  orderItems: OrderItemEntity[];

  @Column({ name: "user_id" })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({
    name: "user_id",
    referencedColumnName: "id",
  })
  user: UserEntity;

  @Column({ name: "address_id" })
  addressId: number;

  @ManyToOne(() => AddressEntity, (address) => address.id)
  @JoinColumn({
    name: "address_id",
    referencedColumnName: "id",
  })
  address: AddressEntity;

  @Column({ name: "courrier_id" })
  courrierId: number;

  @ManyToOne(() => CourrierEntity, (courrier) => courrier.id)
  @JoinColumn({
    name: "courrier_id",
    referencedColumnName: "id",
  })
  courrier: CourrierEntity;

  @Column({ name: "payment_card_id" })
  paymentCardId: number;

  @ManyToOne(() => PaymentCardEntity, (paymentCard) => paymentCard.id)
  @JoinColumn({
    name: "payment_card_id",
    referencedColumnName: "id",
  })
  paymentCard: PaymentCardEntity;

  @Column({ name: "order_status_id" })
  orderStatusId: number;

  @ManyToOne(() => OrderStatusEntity, (orderStatus) => orderStatus.id)
  @JoinColumn({
    name: "order_status_id",
    referencedColumnName: "id",
  })
  orderStatus: OrderStatusEntity;

  @OneToOne(() => InvoiceEntity, (invoice) => invoice.orderId)
  invoice: InvoiceEntity;

  @OneToOne(() => ReturnEntity, (returnEntity) => returnEntity.orderId)
  return: ReturnEntity;
}
