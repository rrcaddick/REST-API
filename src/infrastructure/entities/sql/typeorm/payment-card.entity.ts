import { Column, Entity, OneToMany } from "typeorm";
import { IPaymentCardEntity } from "../interfaces/payment-card.entity.interface";
import { BaseEntity } from "./base.entity";
import { OrderEntity } from "./order.entity";

@Entity("payment_cards")
export class PaymentCardEntity extends BaseEntity implements IPaymentCardEntity {
  @Column({ name: "card_type" })
  cardType: string;
  
  @Column({ name: "last_four_digits" })
  lastFourDigits: string;
  
  @Column({ name: "expiry_month" })
  expiryMonth: number;

  @Column({ name: "expiry_year" })
  expiryYear: number;
  
  @Column({ name: "card_token" })
  cardToken: string;

  @Column({ name: "user_id" })
  userId: number;

  @OneToMany(() => OrderEntity, order => order.paymentCardId)
  orders: OrderEntity[]
}