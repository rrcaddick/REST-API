import { autoInjectable, inject } from "tsyringe";
import { BaseRepository } from "@repositories/sql/typeorm/base.repository";
import { PaymentCardEntity } from "@entities/sql/typeorm/payment-card.entity";
import { IPaymentCardEntity } from "@entities/sql/interfaces/payment-card.entity.interface";

@autoInjectable()
export class PaymentCardRepository extends BaseRepository<PaymentCardEntity, IPaymentCardEntity> {
  constructor(@inject("PaymentCardEntity") paymentCardEntity: PaymentCardEntity) {
    super(paymentCardEntity);
  }
}
