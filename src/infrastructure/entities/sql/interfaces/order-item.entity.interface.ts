import { IBaseEntity } from "@entities/sql/interfaces/base.entity.interface";

export interface IOrderItemEntity extends IBaseEntity {
  orderId: number;
  productId: number;
  price: number;
  quantity: number;
}
