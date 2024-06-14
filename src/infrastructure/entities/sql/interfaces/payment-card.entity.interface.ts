import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IPaymentCardEntity extends IBaseEntity {
  userId: number;
  cardType: string;
  lastFourDigits: string;
  expiryMonth: number;
  expiryYear: number;
  cardToken: string;
}
