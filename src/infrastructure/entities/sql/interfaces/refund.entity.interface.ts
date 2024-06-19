import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IRefundEntity extends IBaseEntity {
  returnId: number;
  paymentCardId: number;
  date: Date;
  amount: number;
}
