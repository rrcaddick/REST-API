import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IOrderEntity extends IBaseEntity {
  addressId: number;
  userId: number;
  orderDate: Date;
  shippedDate: Date;
  courrierId: number;
  orderStatusId: number;
  totalDue: number;
  paymentCardId: number;
}
