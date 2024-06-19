import { Column, Entity, OneToMany } from "typeorm";
import { IPaymentCardEntity } from "@entities/sql/interfaces/payment-card.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { OrderEntity } from "@entities/sql/typeorm/order.entity";
import { RefundEntity } from "@entities/sql/typeorm/refund.entity";

@Entity("payment_cards")
export class PaymentCardEntity extends BaseEntity implements IPaymentCardEntity {
  @Column({ name: "card_type" })
  public cardType: string;

  @Column({ name: "last_four_digits" })
  public lastFourDigits: string;

  @Column({ name: "expiry_month" })
  public expiryMonth: number;

  @Column({ name: "expiry_year" })
  public expiryYear: number;

  @Column({ name: "card_token" })
  public cardToken: string;

  @Column({ name: "user_id" })
  public userId: number;

  @OneToMany(() => OrderEntity, (order) => order.paymentCardId)
  public orders: OrderEntity[];

  @OneToMany(() => RefundEntity, (refund) => refund.paymentCardId)
  public refunds: RefundEntity[];
}
