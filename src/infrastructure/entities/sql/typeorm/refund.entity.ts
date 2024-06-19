import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { IRefundEntity } from "@entities/sql/interfaces/refund.entity.interface";
import { BaseEntity } from "@entities/sql/typeorm/base.entity";
import { ReturnEntity } from "./return.entity";
import { PaymentCardEntity } from "./payment-card.entity";

@Entity("refunds")
export class RefundEntity extends BaseEntity implements IRefundEntity {
  @PrimaryColumn({ name: "return_id" })
  public returnId: number;

  @PrimaryColumn({ name: "payment_card_id" })
  public paymentCardId: number;

  @Column({ type: "datetime" })
  public date: Date;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  public amount: number;

  @OneToOne(() => ReturnEntity, (returnEntity) => returnEntity.id)
  @JoinColumn({
    name: "return_id",
    referencedColumnName: "id",
  })
  public return: ReturnEntity;

  @ManyToOne(() => PaymentCardEntity, (paymentCard) => paymentCard.id)
  @JoinColumn({
    name: "payment_card_id",
    referencedColumnName: "id",
  })
  public paymentCard: PaymentCardEntity;
}
