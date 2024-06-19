import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IReturnEntity extends IBaseEntity {
  orderId: number;
  returnDate: Date;
  status: string;
  reason: string;
  refundMethod: string;
  total: number;
}
